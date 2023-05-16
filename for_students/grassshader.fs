
/* simple fragment shader
* makes a WORLD SPACE grating (spatial solid texture) that the object can move through
*/

varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

void main()
{

   gl_FragColor = vec4( 0,
                         (-38.0*v_xyz_local.y*(1.0-v_xyz_local.y)+166.0)/256.0,
                        (-6.0*v_xyz_local.y*(1.0-v_xyz_local.y)+19.0)/256.0,1);
}



