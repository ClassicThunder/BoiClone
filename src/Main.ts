///<reference path="../typings/tsd.d.ts" />
///<reference path="./Level/Level.ts" />

class Main 
{
    private renderer:THREE.WebGLRenderer;
    private scene:THREE.Scene;
    private camera:THREE.PerspectiveCamera;
    
    private level:Level;

    constructor() 
    {
        this.initTHREE();
        this.initScene();                                    
        this.render();                        
    }

    private initTHREE():void 
    {
        var container = document.getElementById("container");
        var width = container.clientWidth;
        var height = container.clientHeight;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);            
        this.scene.add(this.camera);
        
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        
        container.appendChild(this.renderer.domElement);
    }

    private initScene():void 
    {
        this.level = new Level();        
        this.level.buildScene(this.scene);
                    
        this.camera.position.z = 5;
        this.camera.lookAt(
            new THREE.Vector3(
                this.level.position.x, 
                this.level.position.y, 
                this.level.position.z));
    }

    public render():void 
    {
        requestAnimationFrame(() => this.render());

        this.level.render();
        
        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;            

        this.renderer.render(this.scene, this.camera);
    }
}