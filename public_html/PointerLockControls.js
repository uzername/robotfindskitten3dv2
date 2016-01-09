/**
 * @author mrdoob / http://mrdoob.com/
 */
/*mr. dob origionally had only 'camera' in this constructor*/
THREE.PointerLockControls = function ( camera , rootCharacter ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );
        var characterObject = rootCharacter;

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.add( pitchObject );
        
        /*mr dob did not origionally have characterObject*/
        
        characterObject.add(yawObject); 
        yawObject.position.y = 10;
        yawObject.position.z = 10;
        
        /*
        yawObject.add(characterObject);
        */
	var PI_2 = Math.PI / 2;

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                /*
		yawObject.rotation.y -= movementX * 0.002;
                */
                
                characterObject.rotation.y -= movementX * 0.002;
                
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	this.dispose = function() {

		document.removeEventListener( 'mousemove', onMouseMove, false );

	};

	document.addEventListener( 'mousemove', onMouseMove, false );

	this.enabled = false;
        /*
        this.setObject = function (rootObject) {
            characterObject=rootObject;
        };
        */
        /**
         * get rotation object
         * @returns {THREE.Object3D|THREE.PointerLockControls.yawObject}
         */
	this.getObject = function () {
                
		return yawObject;
               
              /*
               return characterObject; 
              */
              /*mr dob origionally did not have any characterObject*/
	};

        this.getCharacterObject = function() {
            
            return characterObject;
        };

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
                var unnamedFunction = function( v ) {
			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
			v.copy( direction ).applyEuler( rotation );
			return v;
		};
		return unnamedFunction;
	}/*()*/;

};
