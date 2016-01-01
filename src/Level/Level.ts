///<reference path="../../typings/tsd.d.ts" />
///<reference path="../PatrolJS.d.ts" />

class Level extends THREE.Object3D
{
    private cube:THREE.Mesh;
    
    public constructor() 
    {
        console.log("constructor");
        
        super();
    }
    
    public buildScene(scene:THREE.Scene):void 
    {            
        var sqLength = 80;

        var squareShape = new THREE.Shape();
        squareShape.moveTo(-5, -6);
        squareShape.lineTo(-6, -5);
        squareShape.lineTo(-6, 5);
        squareShape.lineTo(-5, 6);
        squareShape.lineTo(5, 6);
        squareShape.lineTo(6, 5);
        squareShape.lineTo(6, -5);
        squareShape.lineTo(5, -6);
        squareShape.lineTo(-5, -6 );
            
        //Generating the Navigation Mesh
        var navGeometry = new THREE.ShapeGeometry(squareShape);
        var navMesh = new THREE.Mesh(
            navGeometry, 
            new THREE.MeshPhongMaterial({color: 0xff00ff, side: THREE.DoubleSide}));
        scene.add(navMesh);

        navMesh.position.set(0, 0, 2);

        //Path Finding
        var zoneNodes = patrol.buildNodes(navGeometry);
        patrol.setZoneData('level', zoneNodes);
        // Set the player's navigation mesh group
        var playerNavMeshGroup = patrol.getGroup('level', new THREE.Vector3(0, 0, 2));
// calculatedPath = patrol.findPath(player.position, target.position, 'level', playerNavMeshGroup);


        //Visible Mesh        
        var extrudeSettings = { 
            amount: 0.5, 
            bevelEnabled: true,
             bevelSegments: 1,
              steps: 1,
               bevelSize: 0.25, 
               bevelThickness: 0.25 };        
        
        var pathGeometry = new THREE.ExtrudeGeometry( squareShape, extrudeSettings );

        var mesh = new THREE.Mesh(
            pathGeometry, 
            new THREE.MeshPhongMaterial( { color: 0x0000ff } ) );

        mesh.position.set(0, 0, 0);
        
        scene.add( mesh );         
    }

    public render():void 
    {

    }
}
