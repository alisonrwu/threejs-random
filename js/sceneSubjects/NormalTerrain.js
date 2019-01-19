function NormalTerrain(scene) {
	noise.seed(Math.random());

	let geometry = makeTile(1,10);
	// let material = new THREE.MeshBasicMaterial();
	let material = new THREE.MeshNormalMaterial();
	let mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// size of each quad, tiles defines # of quads wide
	function makeTile(size, tiles, centerX=0, centerZ=0) {
		let geom = new THREE.Geometry();
		let x,y,z, position, addFace;
		for(let i=0; i<=tiles; i++) {
			for(let j=0; j<=tiles; j++) {
				x = i * size;
				z = j * size;
				// y = 0;
				// y = noise.perlin2(x/max, z/max)*size;
				y = noise.simplex2(x, z)*size;
				position = new THREE.Vector3(x,y,z);
				addFace = (i>0) && (j>0);
				makeQuad(geom, position, addFace, tiles+1);
			}
		}
		// geom.computeVertexNormals();
		geom.computeFaceNormals();
		geom.normalsNeedUpdate = true;

		let half = (size*tiles)/2;
		geom.translate(centerX-half,0,centerZ-half);
		return geom;
	}

	function makeQuad(geom, position, addFace, verts) {
		geom.vertices.push(position);
		if(addFace) {
			let i1 = geom.vertices.length - 1;
			let i2 = i1 - 1;
			let i3 = i1 - verts;
			let i4 = i1 - verts - 1;
			geom.faces.push(new THREE.Face3(i2, i3, i1));
    		geom.faces.push(new THREE.Face3(i2, i4, i3));
		}
	}
}