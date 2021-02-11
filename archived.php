<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="theme-color" content="#000000"><title><?php   if(is_front_page())
       echo "Home";
   else if(is_404())
       echo "Page Not Found";
   else if(is_category() || is_search() )
       echo single_cat_title();
   else
       the_title();
   echo ' | '.get_bloginfo('name');
?></title><?php  //Template Name: Archived
?><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/fonts/fonts.css"><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/app.css"><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script><?php wp_head(); ?></head><body><?php include 'includes/mylottie.php'; ?>
<?php include 'includes/mymenu.php'; ?>
<?php include 'includes/myoverlay.php'; ?>
<?php include 'includes/mycanvas.php'; ?>
<?php include 'includes/myarchived.php'; ?>
<?php include 'includes/mygooey.php'; ?><div class="e-rel" id="barba-wrapper" data-barba="wrapper" data-scroll><div class="barba-container page-archived e-wp" data-barba="container" data-barba-namespace="archived" data-namespace="archived" data-current="" data-scroll-content><div class="gallery"><div class="gallery__travel e-rel e-hp"><?php $index = 0; if(have_rows('dribbble_shots')): while(have_rows('dribbble_shots')) : the_row(); $index++;?><div class="gallery__each gallery__img__<?=$index?>" data-item="<?=$index?>" data-plx="<?=($index % 2 === 0) ? "on" : ""?>" data-zindex="<?=$index?>"><div class="gallery__img e-hidden e-rel e-hp e-wp"><picture class="e-flex"><img class="e-hp e-wp e-img-fit js-img img-load" src="<?=the_sub_field('image')?>" alt="" data-dribbble-link="<?=the_sub_field('url')?>" data-name="<?=the_sub_field('name')?>" data-front="<?=$index?>"></picture></div></div><?php endwhile; else : endif; ?></div></div><?php wp_footer(); ?></div></div></body></html>