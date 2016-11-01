(function () {
    let scene = new window.Scene(document.querySelector('.scene'));
    let house = new window.House(scene);

    Promise.all([
        house.create()
    ]).then(units => {

        units.forEach(unit => {
           scene.addColladaUnit(unit, 0, 16, 0)
        });


        scene.animate();
    });

})();
