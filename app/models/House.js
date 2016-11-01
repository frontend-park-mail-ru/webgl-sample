window.House = (function () {

    class House {

        constructor(scene) {
            this.loader = new window.THREE.ColladaLoader();
            this.scene = scene;
        }

        create() {

            return new Promise((resolve, reject) => {

                this.loader.load('models/deaths-star.dae', function (collada) {
                    resolve(collada);
                });

            });

        }

    }

    return House;
})();