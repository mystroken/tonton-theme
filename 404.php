<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="theme-color" content="#000000"><title><?php    if(is_front_page())
       echo "Home";
   else if(is_404())
       echo "Page Not Found";
   else if(is_category() || is_search() )
       echo single_cat_title();
   else
       the_title();
   echo ' | '.get_bloginfo('name');  
?></title><?php  //Template Name: 404
?><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/fonts/fonts.css"><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/app.css"><?php wp_head(); ?></head><body><?php include 'includes/mylottie.php'; ?>
<?php include 'includes/mymenu.php'; ?>
<?php include 'includes/myoverlay.php'; ?>
<?php include 'includes/mycanvas.php'; ?>
<?php include 'includes/myarchived.php'; ?>
<?php include 'includes/mygooey.php'; ?><div class="e-rel" id="barba-wrapper" data-barba="wrapper" data-scroll><div class="barba-container page-404 e-wp" data-barba="container" data-barba-namespace="notFound" data-namespace="notFound" data-current="" data-scroll-content><main class="main-404 e-wp e-hvh e-black e-flex"><div class="main-404__hold e-flex-col"><h1 class="e-sans t-white e-bold">404</h1><span class="t-gray">This is a page about nothing</span><div class="gif e-rel"><img class="e-wp img-load" src="<?php echo get_template_directory_uri(); ?>/images/404.gif"></div><div class="all-projects"><a href="<?php echo get_site_url(); ?>" data-to="home" data-from="single"><button class="e-curp e-rel e-flex scale hover-line"><div class="cross e-rel"><div class="cross__line line1 e-black e-abs"></div><div class="cross__line line2 e-black e-abs"></div></div><span class="e-bold e-sans t-white">Just Go Home<div class="line-link e-wp e-switch-gray e-switch"></div></span></button></a></div></div></main><?php wp_footer(); ?></div><!-- init foooter--></div></body></html>