function SceneManager(canvas) {
	const clock = new THREE.Clock();
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const scene = buildScene();
    const renderer = buildRenderer(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = new THREE.OrbitControls(camera);
    const sceneSubjects = createSceneSubjects(scene);
    const city = new CityScape(scene, renderer);

    function buildScene() {
        let scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0xd0e0f0, 0.0025 );
        return scene;
    }

    function buildRenderer({ width, height }) {
        let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        let DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        renderer.setClearColor( 0xd8e7ff );
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        return renderer;
    }

    function buildCamera({ width, height }) {
        let aspectRatio = width / height;
        let fieldOfView = 40;
        let nearPlane = 1;
        let farPlane = 3000; 
        let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0,120,280);
		camera.lookAt(0,0,0);
        return camera;
    }

    function createSceneSubjects(scene) {
        let sceneSubjects = [
            new GeneralLights(scene),
            // new NormalCube(scene)
        ];
		scene.add(new THREE.AxesHelper(1)); // WORLD COORDINATE FRAME

        return sceneSubjects;
    }

    this.update = function() {
        let elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
        	sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    }

    this.onWindowResize = function() {
        let { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }
}