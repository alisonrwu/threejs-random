function FloorPlane(scene) {
	let plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshBasicMaterial( { color: 0x101018 } ) );
	plane.rotation.x = - 90 * Math.PI / 180;
	scene.add(plane);
}