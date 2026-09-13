"""Headless preview render of the built OrbitalCore model, for visual
sanity checking before wiring it into the web app:

    blender --background --python blender/render-preview.py
"""

import math
import os
import bpy
import importlib.util

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, "preview.png"))

spec = importlib.util.spec_from_file_location(
    "build_orbital_core", os.path.join(SCRIPT_DIR, "build-orbital-core.py")
)
build_orbital_core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build_orbital_core)

model = build_orbital_core.build()

# Camera
bpy.ops.object.camera_add(location=(3.2, -3.2, 1.9))
cam = bpy.context.active_object
cam.rotation_euler = (math.radians(72), 0, math.radians(45))
cam.data.lens = 45
bpy.context.scene.camera = cam

# Key + fill lights
bpy.ops.object.light_add(type="AREA", location=(2.5, -2.0, 3.0))
key = bpy.context.active_object
key.data.energy = 400
key.data.size = 2.5

bpy.ops.object.light_add(type="AREA", location=(-2.5, 1.5, 1.5))
fill = bpy.context.active_object
fill.data.energy = 120
fill.data.size = 3.0
fill.data.color = (0.6, 0.75, 1.0)

scene = bpy.context.scene
# EEVEE Next needs GPU compute shaders that aren't available in this headless
# environment (crashes outright); Cycles' CPU path works reliably headless.
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 64

scene.render.film_transparent = True
scene.render.resolution_x = 900
scene.render.resolution_y = 900
scene.render.filepath = OUT_PATH
bpy.ops.render.render(write_still=True)
print(f"Rendered preview to {OUT_PATH}")
