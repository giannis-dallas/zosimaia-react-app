<?php
/*
Plugin Name: Zosimain React App
Plugin URI:  
Description: Zosimaia plugin with front-end react app
Version:     1.0
Author:      Giannis Dallas
Author URI:  https://giannisdallas.com
License:     GPL2 etc
License URI: 
*/

function Zosimaia_React_App_func(){
	return "<div id='zosimaia_App'>This is a test</div>";
}
add_shortcode( 'Zosimaia-App', 'Zosimaia_React_App_func' );

add_action( 'wp_enqueue_scripts', 'enqueue_zosimaia_plugin_js' );
function enqueue_zosimaia_plugin_js() {

	wp_enqueue_script(
	  'zosimaia-frontend',
	  plugin_dir_url( __FILE__ ) . '/app/dist/main.js',
	  //plugin_dir_url( __FILE__ ) . '/app/src/index.js',
	  ['wp-element'],
	  time(), // Change this to null for production
	  true
	);

}

add_action( 'admin_menu', 'my_admin_menu' );
function my_admin_menu() {
	add_menu_page( 'Edit Zosimaia Members', 'Zosimaia Members', 'manage_options', 'members.php', 'zosimaia_admin_page', 'dashicons-id', 6  );
}

function zosimaia_admin_page(){
echo 'Welcome to admin page';
echo "<div id='zosimaia_App'>This is a test</div>";
echo "<p style='text-align:center;'>" .$hook. "</p>";
}

function enqueue_my_scripts($hook) {

    if ( 'toplevel_page_members' != $hook ) {
        return;
    }

    wp_enqueue_script(
		'zosimaia-frontend',
		plugin_dir_url( __FILE__ ) . '/app/dist/main.js',
		//plugin_dir_url( __FILE__ ) . '/app/src/index.js',
		['wp-element'],
		time(), // Change this to null for production
		true
	  );

}
add_action( 'admin_enqueue_scripts', 'enqueue_my_scripts' );