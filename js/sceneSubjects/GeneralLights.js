function GeneralLights(scene) {
	const light = new THREE.HemisphereLight( 0xfffff0, 0x101020, 1.25 );
	light.position.set( 0.75, 1, 0.25 );
	scene.add( light );

	// const light = new THREE.PointLight("#ffffff");
	// light.position.set(0,40,20);
    // scene.add(light);

    // const ambientLight = new THREE.AmbientLight(0x606060);
    // scene.add(ambientLight);
	
	this.update = function(time) {
		// light.intensity = (Math.sin(time)+1.5)/1.5;
		// light.color.setHSL( Math.sin(time), 0.5, 0.5 );
	}
}