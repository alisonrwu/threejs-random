function NormalCube(scene) {
	const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );

	mesh.position.set(0,0,0);

	scene.add(mesh);

	this.update = function(time) {
		const scale = Math.sin(time)+2;
		mesh.scale.set(scale, scale, scale);

		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
	}
}