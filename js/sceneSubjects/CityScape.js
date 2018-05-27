function CityScape(scene, renderer) {
    let plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshBasicMaterial( { color: 0x101018 } ) );
	plane.rotation.x = - 90 * Math.PI / 180;
	scene.add( plane );

	let geometry = new THREE.CubeGeometry(1,1,1);
	// move pivot point to bottom of cube
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	// remove bottom face
	geometry.faces.splice(6,2);
	geometry.faceVertexUvs[0].splice(6,2);
	// set roof UV to single coord, same colour as floor
	geometry.faceVertexUvs[0][4][0].set(0,0);
	geometry.faceVertexUvs[0][4][1].set(0,0);
	geometry.faceVertexUvs[0][4][2].set(0,0);
	geometry.faceVertexUvs[0][5][0].set(0,0);
	geometry.faceVertexUvs[0][5][1].set(0,0);
	geometry.faceVertexUvs[0][5][2].set(0,0);

	let buildingMesh = new THREE.Mesh(geometry);
	let cityGeometry = new THREE.Geometry();
	let light = new THREE.Color(0xffffff);
	let shadow = new THREE.Color(0x303050);

	for(let i=0; i<20000; i++) {
		buildingMesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;
		buildingMesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
		buildingMesh.rotation.y = Math.random()*Math.PI*2;
		buildingMesh.scale.x  = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
		buildingMesh.scale.y  = (Math.random() * Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
		buildingMesh.scale.z  = buildingMesh.scale.x;

		// establish the base color for the buildingMesh, randomized grays
		let value = 1 - Math.random() * Math.random();
		let baseColor = new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
		let topColor    = baseColor.clone().multiply( light );
		let bottomColor = baseColor.clone().multiply( shadow );
		// set vertexColors for each face
		let geometry = buildingMesh.geometry;
		for (let j = 0, jl = geometry.faces.length; j < jl; j++) {
			if(j == 4 || j == 5) { // top face
				geometry.faces[j].vertexColors = [baseColor, baseColor, baseColor];
			} else if(j%2 == 0) { // top left triangle on sides
				geometry.faces[j].vertexColors = [topColor, bottomColor, topColor];
			} else if(j%2 == 1) { // bot right triangle on sides
				geometry.faces[j].vertexColors = [bottomColor, bottomColor, topColor];
			}
		}
		// merge it with cityGeometry - very important for performance
		cityGeometry.mergeMesh(buildingMesh);
	}

	// generate the texture
	let texture = new THREE.Texture( generateTexture() );
	texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	texture.needsUpdate = true;

	// build the mesh
	let material  = new THREE.MeshLambertMaterial({
	  map: texture,
	  vertexColors: THREE.VertexColors
	});
	let cityMesh = new THREE.Mesh(cityGeometry, material);
	scene.add(cityMesh);

	function generateTexture() {
		// build a small canvas and paint it all white
		let canvas = document.createElement('canvas');
		canvas.width = 32;
		canvas.height = 64;
		let context = canvas.getContext('2d');
		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 32, 64);
		// draw the window rows, with a small noise to simulate light letiations in each room
		for(let y = 2; y < 64; y += 2) {
		  for(let x = 0; x < 32; x += 2) {
		      let value = Math.floor( Math.random() * 64 );
		      context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
		      context.fillRect( x, y, 2, 1 );
		  }
		}

		// build a bigger canvas and copy the small one in it
		// this is a trick to upscale the texture without filtering
		let canvas2 = document.createElement('canvas');
		canvas2.width = 512;
		canvas2.height = 1024;
		let context2 = canvas2.getContext('2d');
		// disable smoothing
		context2.imageSmoothingEnabled = false;
		context2.webkitImageSmoothingEnabled = false;
		context2.mozImageSmoothingEnabled = false;
		// then draw the image
		context2.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);

		return canvas2;
		// document.body.appendChild(canvas2); // for outputting onto html
	}
}