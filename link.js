class Link{
    constructor(bodyA,bodyB){
        var lastlink = bodyA.body.bodies.length - 2
        this.link = Constraint.create({
            bodyA:bodyA.body.bodies[lastlink],
            bodyB: bodyB,
            length:  0,
            stiffness: 0.01
            
        })
        World.add(engine.world,this.link)
    }
    detach(){
        World.remove(engine.world,this.link)
    }
}