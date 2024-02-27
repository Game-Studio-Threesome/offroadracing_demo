
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

const carDefault = {
	maxSpeed : 100,
	acceleration : 30
}

const defaultModificator = {
	maxSpeed : 1,
	acceleration : 1
}

const sandModificator = {
	maxSpeed : 0.5,
	acceleration : 0.5
}

function Tick(runtime)
{
	// Code to run every tick
	const sands = runtime.objects.Sand.getAllInstances();
	const player = runtime.objects.Player.getFirstInstance();
	const car = player.behaviors.Car;
	
	let modificator = defaultModificator;
	
	const isOverLap = sands.some(sand => runtime.collisions.testOverlap(player, sand));
	
	if(isOverLap){
		modificator = sandModificator;
	}
	
	car.maxSpeed = carDefault.maxSpeed * modificator.maxSpeed;
	car.acceleration = carDefault.acceleration * modificator.acceleration;
	
	console.log(`Speed: ${ car.speed }`);
}
