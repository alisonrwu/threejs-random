function HillyFields(scene) {
	let geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3( 1, -1, 0));
	geometry.vertices.push(new THREE.Vector3(-1,  1, 0));
	geometry.vertices.push(new THREE.Vector3(-1, -1, -1));
	geometry.vertices.push(new THREE.Vector3( 1,  1, -1));

	//Face3 takes three vertex indices, a normal and then a color
	//We aren't worried about normals right now so we pass null in instead
	let colors = [new THREE.Color(1, 0, 0), new THREE.Color(0, 1, 0), new THREE.Color(0, 0, 1)];
	// geometry.faces.push(new THREE.Face3(0, 1, 2, null, new THREE.Color(0.9, 0.7, 0.75)));
	geometry.faces.push(new THREE.Face3(0, 1, 2, null, colors));
	let uvs1 = [new THREE.Vector2(1,0), new THREE.Vector2(0,1), new THREE.Vector2(0,0)]
	geometry.faceVertexUvs[0].push(uvs1);

	// geometry.faces.push(new THREE.Face3(0, 3, 1, null, new THREE.Color(0.6, 0.85, 0.7)));
	geometry.faces.push(new THREE.Face3(0, 3, 1, null, colors));
	let uvs2 = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
	geometry.faceVertexUvs[0].push(uvs2);

	// geometry.computeVertexNormals();
	geometry.computeFaceNormals();
	geometry.normalsNeedUpdate = true;

	let texture = new THREE.TextureLoader().load('../../assets/uv_grid.jpg');
	let material = new THREE.MeshBasicMaterial({
		// map: texture,
	  	vertexColors: THREE.VertexColors
	});
	// let material = new THREE.MeshBasicMaterial();
	// let material = new THREE.MeshNormalMaterial();
	let mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
}