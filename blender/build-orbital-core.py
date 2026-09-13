"""
Procedurally builds "OrbitalCore" — a fractured dark-metal shell wrapped
around a glowing energy core, ringed by orbiting tech modules tethered by
thin struts, drifting crystal shards, and two tilted orbital rings. Exported
as a web-optimized .glb. Run headlessly:

    blender --background --python blender/build-orbital-core.py

Replaces "DataMonolith" (build-data-monolith.py): the user supplied a
reference image of a central fractured orb radiating energy, surrounded by
orbiting satellite modules and thin ring bands — a "command core" silhouette
rather than a stacked-hardware one. This script reinterprets that reference
as clean procedural geometry (no baked text/icons, matching the site's
minimalist taste) rather than a literal copy of the flat artwork.

Regenerate the model by editing this file and re-running it; nothing here
is hand-tweaked in the .glb directly, so the model stays reproducible.
"""

import math
import os
import random

import bmesh
import bpy
from mathutils import Vector

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "public", "models", "orbital-core.glb"))

ENGINEERING_CYAN = (0.216, 0.835, 0.957)

CORE_RADIUS = 0.14
SHELL_RADIUS = 0.34
SATELLITE_RADIUS = 0.42
CORE_CYAN = (0.05, 0.55, 0.98)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in list(bpy.data.meshes):
        if block.users == 0:
            bpy.data.meshes.remove(block)


def make_material(name, base_color, metallic=0.85, roughness=0.35, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*base_color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat


def add_bevel(obj, width, segments):
    mod = obj.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    return mod


def apply_all_modifiers(obj):
    bpy.context.view_layer.objects.active = obj
    for mod in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)


def shade_smooth_hard_edges(obj, angle_deg=35):
    bpy.context.view_layer.objects.active = obj
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=math.radians(angle_deg))
    except AttributeError:
        bpy.ops.object.shade_smooth()
        try:
            obj.data.use_auto_smooth = True
            obj.data.auto_smooth_angle = math.radians(angle_deg)
        except AttributeError:
            pass


def point_along(obj, direction: Vector):
    """Orients obj's local +Z axis to point along `direction` (used for
    cylinders/boxes that should radiate outward from the core)."""
    obj.rotation_euler = direction.normalized().to_track_quat("Z", "Y").to_euler()


def build_fractured_shell(material):
    """A faceted icosphere broken into separated armor plates — each face
    inset and shrunk from its neighbors, with the border ("flange") faces
    between them removed so a glowing seam of empty space shows all the
    way around every plate, plus a handful of plates dropped entirely to
    reveal the energy core underneath. Built with bmesh (inset each face,
    then delete geometry) rather than a boolean/bend rig, so it stays
    simple and robust to re-run."""
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=SHELL_RADIUS, location=(0, 0, 0))
    shell = bpy.context.active_object
    shell.name = "FracturedShell"

    bm = bmesh.new()
    bm.from_mesh(shell.data)
    bm.faces.ensure_lookup_table()

    res = bmesh.ops.inset_individual(bm, faces=bm.faces[:], thickness=SHELL_RADIUS * 0.09, depth=0.0)
    plate_faces = set(res["faces"])
    flange_faces = [f for f in bm.faces if f not in plate_faces]
    bmesh.ops.delete(bm, geom=flange_faces, context="FACES")

    rng = random.Random(7)
    dropped = [f for f in bm.faces if rng.random() < 0.22]
    bmesh.ops.delete(bm, geom=dropped, context="FACES")

    bm.to_mesh(shell.data)
    bm.free()

    shell.data.materials.append(material)

    solidify = shell.modifiers.new("Solidify", "SOLIDIFY")
    solidify.thickness = SHELL_RADIUS * 0.12
    solidify.offset = 0.0

    add_bevel(shell, SHELL_RADIUS * 0.025, 2)
    apply_all_modifiers(shell)
    shade_smooth_hard_edges(shell)
    return shell


def build_core(material):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=CORE_RADIUS, location=(0, 0, 0))
    core = bpy.context.active_object
    core.name = "EnergyCore"
    core.data.materials.append(material)
    shade_smooth_hard_edges(core)
    return core


SATELLITES = [
    (20, 40),
    (200, 30),
    (105, 100),
    (300, 112),
    (355, 150),
    (165, 158),
]


def spherical(theta_deg, phi_deg, radius):
    theta = math.radians(theta_deg)
    phi = math.radians(phi_deg)
    x = radius * math.sin(phi) * math.cos(theta)
    y = radius * math.sin(phi) * math.sin(theta)
    z = radius * math.cos(phi)
    return Vector((x, y, z))


def build_satellites(body_mat, edge_mat, strut_mat):
    parts = []
    for i, (theta, phi) in enumerate(SATELLITES):
        pos = spherical(theta, phi, SATELLITE_RADIUS)
        direction = pos.normalized()

        bpy.ops.mesh.primitive_cube_add(size=1, location=pos)
        module = bpy.context.active_object
        module.name = f"Satellite_{i}"
        module.scale = (0.13, 0.095, 0.075)
        point_along(module, direction)
        module.data.materials.append(body_mat)
        add_bevel(module, 0.012, 2)
        apply_all_modifiers(module)
        parts.append(module)

        edge_pos = pos + direction * 0.05
        bpy.ops.mesh.primitive_cube_add(size=1, location=edge_pos)
        led = bpy.context.active_object
        led.name = f"SatelliteLED_{i}"
        led.scale = (0.03, 0.03, 0.01)
        point_along(led, direction)
        led.data.materials.append(edge_mat)
        parts.append(led)

        inner = pos * (CORE_RADIUS * 1.05 / pos.length)
        mid = (inner + pos) / 2
        strut_len = (pos - inner).length
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=0.009, depth=strut_len, location=mid)
        strut = bpy.context.active_object
        strut.name = f"Strut_{i}"
        point_along(strut, direction)
        strut.data.materials.append(strut_mat)
        parts.append(strut)
    return parts


SHARDS = [
    (55, 70, 0.48, 0.06),
    (140, 55, 0.55, 0.045),
    (250, 95, 0.52, 0.07),
    (10, 130, 0.58, 0.05),
    (190, 140, 0.47, 0.06),
    (320, 165, 0.6, 0.04),
    (75, 20, 0.62, 0.05),
    (230, 170, 0.53, 0.045),
]


def build_shards(material):
    parts = []
    for i, (theta, phi, radius, size) in enumerate(SHARDS):
        pos = spherical(theta, phi, radius)
        bpy.ops.mesh.primitive_cube_add(size=size, location=pos)
        shard = bpy.context.active_object
        shard.name = f"Shard_{i}"
        shard.rotation_euler = (
            math.sin(i * 1.7) * math.pi,
            math.cos(i * 1.3) * math.pi,
            math.sin(i * 0.9) * math.pi,
        )
        shard.data.materials.append(material)
        add_bevel(shard, size * 0.08, 1)
        apply_all_modifiers(shard)
        parts.append(shard)
    return parts


def build_rings(material):
    parts = []
    bpy.ops.mesh.primitive_torus_add(major_radius=0.54, minor_radius=0.006, major_segments=64, minor_segments=6)
    ring1 = bpy.context.active_object
    ring1.name = "OrbitRing_1"
    ring1.rotation_euler = (math.radians(72), 0, math.radians(18))
    ring1.data.materials.append(material)
    parts.append(ring1)

    bpy.ops.mesh.primitive_torus_add(major_radius=0.46, minor_radius=0.005, major_segments=64, minor_segments=6)
    ring2 = bpy.context.active_object
    ring2.name = "OrbitRing_2"
    ring2.rotation_euler = (math.radians(105), 0, math.radians(-28))
    ring2.data.materials.append(material)
    parts.append(ring2)
    return parts


def build():
    clear_scene()

    shell_mat = make_material("ShellDark", (0.045, 0.05, 0.065), metallic=0.6, roughness=0.5)
    core_mat = make_material(
        "CoreEmission", CORE_CYAN, metallic=0.1, roughness=0.25,
        emission=CORE_CYAN, emission_strength=1.8,
    )
    module_mat = make_material("ModuleSteel", (0.08, 0.09, 0.11), metallic=0.9, roughness=0.28)
    led_mat = make_material(
        "LedEmission", ENGINEERING_CYAN, metallic=0.1, roughness=0.2,
        emission=ENGINEERING_CYAN, emission_strength=1.4,
    )
    strut_mat = make_material("StrutSilver", (0.5, 0.55, 0.6), metallic=0.95, roughness=0.18)
    shard_mat = make_material(
        "ShardGlass", (0.4, 0.55, 0.6), metallic=0.6, roughness=0.15,
        emission=ENGINEERING_CYAN, emission_strength=0.25,
    )
    ring_mat = make_material(
        "RingGlow", (0.45, 0.5, 0.55), metallic=0.9, roughness=0.2,
        emission=ENGINEERING_CYAN, emission_strength=0.35,
    )

    parts = []
    parts.append(build_core(core_mat))
    parts.append(build_fractured_shell(shell_mat))
    parts.extend(build_satellites(module_mat, led_mat, strut_mat))
    parts.extend(build_shards(shard_mat))
    parts.extend(build_rings(ring_mat))

    bpy.ops.object.select_all(action="DESELECT")
    for obj in parts:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    bpy.ops.object.join()
    joined = bpy.context.active_object
    joined.name = "OrbitalCore"

    return joined


def export(obj):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

    bpy.ops.export_scene.gltf(
        filepath=OUT_PATH,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_materials="EXPORT",
    )
    print(f"Exported OrbitalCore to {OUT_PATH}")


if __name__ == "__main__":
    model = build()
    export(model)
