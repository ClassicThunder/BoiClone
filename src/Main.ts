///<reference path="../typings/tsd.d.ts" />
///<reference path="./Level/Level.ts" />

class Main 
{
    private renderer:THREE.WebGLRenderer;
    private scene:THREE.Scene;
    private camera:THREE.Camera;
    
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
        // this.camera = new THREE.OrthographicCamera(-7, 7, 7, -7, 1, 100);
        this.camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );            
        this.scene.add(this.camera);
        
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 0, -1);
        this.camera.add(directionalLight);
        
        var softLight = new THREE.AmbientLight(0x404040);
        this.camera.add(softLight);
                
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        
        container.appendChild(this.renderer.domElement);
    }

    private initScene():void 
    {
        this.level = new Level();        
        this.level.buildScene(this.scene);
                    
        this.camera.position.z = 10;
        this.camera.position.y = -10;

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

        this.renderer.render(this.scene, this.camera);
    }
}