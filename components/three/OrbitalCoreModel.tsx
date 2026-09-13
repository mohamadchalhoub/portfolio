"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface OrbitalCoreModelProps { interactive?: boolean; }
const TEAL = "#00d4c8";
const AMBER = "#ffb547";
const RADIUS = 1.34;

function pointOnGlobe(lat: number, lon: number, radius = RADIUS) {
  const phi = (90-lat)*Math.PI/180;
  const theta = (lon+180)*Math.PI/180;
  return new THREE.Vector3(-radius*Math.sin(phi)*Math.cos(theta), radius*Math.cos(phi), radius*Math.sin(phi)*Math.sin(theta));
}

const routes = [
  [[33.9,35.5],[51.5,-.1]], [[33.9,35.5],[37.8,-122.4]], [[33.9,35.5],[1.3,103.8]],
  [[40.7,-74],[52.5,13.4]], [[35.7,139.7],[1.3,103.8]], [[25.2,55.3],[48.8,2.3]],
] as const;

function Atmosphere() {
  const material = useMemo(()=>new THREE.ShaderMaterial({
    transparent:true, side:THREE.BackSide, depthWrite:false, blending:THREE.AdditiveBlending,
    uniforms:{ glowColor:{value:new THREE.Color(TEAL)} },
    vertexShader:`varying vec3 vNormal; varying vec3 vWorldPosition; void main(){vNormal=normalize(normalMatrix*normal);vec4 world=modelMatrix*vec4(position,1.0);vWorldPosition=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,
    fragmentShader:`uniform vec3 glowColor; varying vec3 vNormal; varying vec3 vWorldPosition; void main(){vec3 viewDir=normalize(cameraPosition-vWorldPosition);float fresnel=pow(1.0-abs(dot(viewDir,vNormal)),3.2);gl_FragColor=vec4(glowColor,fresnel*.32);}`,
  }),[]);
  return <mesh scale={1.11} material={material}><sphereGeometry args={[RADIUS,64,64]}/></mesh>;
}

function SurfaceData() {
  const geometry = useMemo(()=>{
    const points:number[]=[];
    const count=520; const golden=Math.PI*(3-Math.sqrt(5));
    for(let i=0;i<count;i++){
      const y=1-(i/(count-1))*2; const r=Math.sqrt(1-y*y); const theta=golden*i;
      points.push(Math.cos(theta)*r*(RADIUS+.012),y*(RADIUS+.012),Math.sin(theta)*r*(RADIUS+.012));
    }
    const g=new THREE.BufferGeometry(); g.setAttribute("position",new THREE.Float32BufferAttribute(points,3)); return g;
  },[]);
  return <points geometry={geometry}><pointsMaterial color="#8bded9" size={.018} transparent opacity={.46} sizeAttenuation depthWrite={false}/></points>;
}

function GridLines() {
  return <group>
    {[-60,-30,0,30,60].map(lat=><mesh key={lat} rotation={[Math.PI/2,0,0]} position={[0,Math.sin(lat*Math.PI/180)*RADIUS,0]} scale={[Math.cos(lat*Math.PI/180),Math.cos(lat*Math.PI/180),1]}><torusGeometry args={[RADIUS,.0035,4,128]}/><meshBasicMaterial color={TEAL} transparent opacity={lat===0?.18:.1}/></mesh>)}
    {[0,Math.PI/3,Math.PI*2/3].map(rot=><mesh key={rot} rotation={[0,rot,0]}><torusGeometry args={[RADIUS,.0035,4,128]}/><meshBasicMaterial color={TEAL} transparent opacity={.1}/></mesh>)}
  </group>;
}

function Route({ from, to, index }: { from:readonly number[]; to:readonly number[]; index:number }) {
  const packet=useRef<THREE.Mesh>(null);
  const curve=useMemo(()=>{
    const a=pointOnGlobe(from[0],from[1],RADIUS+.025); const b=pointOnGlobe(to[0],to[1],RADIUS+.025);
    const mid=a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(RADIUS+Math.min(.72,a.distanceTo(b)*.3));
    return new THREE.QuadraticBezierCurve3(a,mid,b);
  },[from,to]);
  const tube=useMemo(()=>new THREE.TubeGeometry(curve,48,.007,5,false),[curve]);
  useFrame((state)=>{if(packet.current) packet.current.position.copy(curve.getPoint((state.clock.elapsedTime*.085+index*.17)%1));});
  return <group>
    <mesh geometry={tube}><meshBasicMaterial color={index%3===1?AMBER:TEAL} transparent opacity={index%3===1?.32:.42} depthWrite={false}/></mesh>
    <mesh ref={packet}><sphereGeometry args={[.026,10,10]}/><meshBasicMaterial color={index%3===1?AMBER:"#d7fffc"} toneMapped={false}/></mesh>
    <mesh position={curve.getPoint(1)}><sphereGeometry args={[.025,10,10]}/><meshBasicMaterial color={index%3===1?AMBER:TEAL} toneMapped={false}/></mesh>
  </group>;
}

function Scanner() {
  const ref=useRef<THREE.Group>(null);
  useFrame((state)=>{if(ref.current) ref.current.rotation.y=state.clock.elapsedTime*.18;});
  return <group ref={ref} rotation={[.28,0,-.18]}>
    <mesh><torusGeometry args={[1.66,.008,6,180]}/><meshBasicMaterial color={TEAL} transparent opacity={.28} depthWrite={false}/></mesh>
    <mesh position={[1.66,0,0]}><sphereGeometry args={[.045,12,12]}/><meshBasicMaterial color="#ffffff" toneMapped={false}/></mesh>
  </group>;
}

/** Threat-intelligence globe: a restrained, shader-lit representation of
 * distributed software systems, live security telemetry and global reach. */
export function OrbitalCoreModel({ interactive=true }:OrbitalCoreModelProps){
  const ref=useRef<THREE.Group>(null); const tilt=useRef({x:0,z:0});
  useFrame((state,delta)=>{if(!ref.current)return;ref.current.rotation.y+=delta*.055;ref.current.position.y=Math.sin(state.clock.elapsedTime*.42)*.035;if(interactive){tilt.current.x=THREE.MathUtils.damp(tilt.current.x,state.pointer.y*.09,3,delta);tilt.current.z=THREE.MathUtils.damp(tilt.current.z,-state.pointer.x*.07,3,delta);}ref.current.rotation.x=tilt.current.x-.08;ref.current.rotation.z=tilt.current.z-.06;});
  return <group ref={ref} scale={1.28}>
    <mesh castShadow receiveShadow><sphereGeometry args={[RADIUS,64,64]}/><meshPhysicalMaterial color="#050b17" metalness={.82} roughness={.3} clearcoat={.7}/></mesh>
    <Atmosphere/><SurfaceData/><GridLines/>
    {routes.map((route,index)=><Route key={index} from={route[0]} to={route[1]} index={index}/>)}
    <Scanner/>
    <pointLight position={[1.8,1.1,2.2]} color={TEAL} intensity={2.4} distance={6}/>
  </group>;
}
