window.Scene = (function () {
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;

    let angle = 0;

    class Scene {

        constructor(root) {
            this.container = root;
            this.createCamera();
            this.createScene();

            this.addAmbient(0xffffff);
            this.addDirectionalLight(0xffeedd);

            this.createRenderer();

            function onWheel(e) {
                var delta = e.deltaY || e.detail || e.wheelDelta;
                this.camera.position.z += delta / 2;
            }

            if (this.container.addEventListener) {
                if ('onwheel' in document) {
                    // IE9+, FF17+, Ch31+
                    this.container.addEventListener("wheel", onWheel.bind(this));
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    this.container.addEventListener("mousewheel", onWheel.bind(this));
                } else {
                    // Firefox < 17
                    this.container.addEventListener("MozMousePixelScroll", onWheel.bind(this));
                }
            } else { // IE8-
                this.container.attachEvent("onmousewheel", onWheel.bind(this));
            }


        }

        createCamera() {
            this.camera = new THREE.PerspectiveCamera(
                2,
                SCREEN_WIDTH / SCREEN_HEIGHT,
                45,
                100000
            );
            this.camera.position.z = 10005;
            this.camera.position.x = 0;
            this.camera.position.y = 0;
        }

        createRenderer() {
            this.renderer = new THREE.WebGLRenderer( { antialias: true } );
            this.renderer.setClearColor( 0xfff4e5 );
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( SCREEN_WIDTH - 10, SCREEN_HEIGHT - 10);

            this.container.appendChild(this.renderer.domElement);
        }

        createScene() {
            this.scene = new THREE.Scene();
        }

        addAmbient(color) {
            let ambient = new THREE.AmbientLight(color);
            this.scene.add(ambient);
        }

        addDirectionalLight(color) {
            // More lights
            var light = new THREE.DirectionalLight( color, 1.5 );
            light.position.set( 0, -4, -4 ).normalize();
            this.scene.add( light );
        }

        addColladaUnit(collada) {
            collada.scene.position.set(0,0,0);
            this.target = collada.scene;
            this.scene.add(collada.scene);
        }

        animate() {
            requestAnimationFrame(this.animate.bind(this));
            this.render();
        }

        render() {
            this.camera.position.x = 10 * Math.cos( angle );
            this.camera.position.y = 10 * Math.sin( angle );
            angle += 0.01;

            this.renderer.render( this.scene, this.camera );
        }

    }

    return Scene;
})();