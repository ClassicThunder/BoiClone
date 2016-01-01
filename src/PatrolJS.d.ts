///<reference path="../typings/threejs/three.d.ts" />

declare module patrol {
    export function buildNodes(geometry: THREE.Geometry): navigationMesh;
    export function setZoneData(level: string, navMesh: navigationMesh): void;
    export function getGroup(group: string, position: THREE.Vector3): void;
        
    export class navigationMesh {
        vertices: any;
        groups: any;
    }   
}