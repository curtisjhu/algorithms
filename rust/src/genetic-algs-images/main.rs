use image::io::Reader as ImageReader;

fn main() {
	let img = ImageReader::open("tesla-in-space.jpeg");
	let data = randomData();
	let difference = infinite;

	while(!happy) {
		newdata = randomize( data );
		newimage = renderImage( newdata );
		newdifference = computeDifferenceMSE( newimage, image );
		if(  newdifference < difference )
		{
			data = newdata;
			difference = newdifference;
	
			// data contains the compressed/encoded image
			saveToDisk( data );
		}
	}
}