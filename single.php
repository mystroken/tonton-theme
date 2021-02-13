<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="theme-color" content="#000000"><title><?php   if(is_front_page())
       echo "Home";
   else if(is_404())
       echo "Page Not Found";
   else if(is_category() || is_search() )
       echo single_cat_title();
   else
       the_title();
   echo ' | '.get_bloginfo('name');
?></title><?php  //Template Name: Single
?><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/fonts/fonts.css"><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/app.css"><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script><?php wp_head(); ?></head><body><?php include 'includes/mylottie.php'; ?>
<?php include 'includes/mymenu.php'; ?>
<?php include 'includes/myoverlay.php'; ?>
<?php include 'includes/mycanvas.php'; ?>
<?php include 'includes/myarchived.php'; ?>
<?php include 'includes/mygooey.php'; ?><div class="e-rel" id="barba-wrapper" data-barba="wrapper" data-scroll><div class="barba-container single e-wp e-white" data-barba="container" data-barba-namespace="single" data-namespace="single" data-current="" data-scroll-content><header class="header-single e-wvw e-rel"><div class="e-hold"><h3 class="js-text-single"><?php the_field('cat_year'); ?></h3><h1 class="e-light js-text-single"><?php the_field('title_project'); ?></h1><h2 class="js-text-single"><?php the_field('excerpt_project'); ?></h2></div><div class="all-projects e-abs"><a href="<?php echo get_site_url(); ?>" data-to="home" data-from="single"><button class="page__close e-rel e-curp bd-black"><span class="t-black e-sans t-switch-a">BACK</span></button></a></div></header><main class="main-single"><?php if( have_rows('flex_content') ): while ( have_rows('flex_content') ) :  the_row(); ?>
<?php if( get_row_layout() == 'how_it_started' ): ?><section class="how_it_started e-rel e-wvw anima-3col three-col-block"><div class="how_it_started__hold e-hold"><h3 class="lg-heading"><?php the_sub_field('heading'); ?></h3><ul><li><p><strong>01. The Problem</strong></p><p><?php the_sub_field('the_problem'); ?></p></li><li><p><strong>02. The Insight</strong></p><p><?php the_sub_field('the_insight'); ?></p></li><li><p><strong>03. The Solution</strong></p><p><?php the_sub_field('the_solution'); ?></p></li></ul></div></section><?php elseif( get_row_layout() == 'project_infos' ): ?><section class="role e-rel e-wvw anima-role"><div class="role__infos" style="background-color:<?php the_sub_field('background_color_texts'); ?>"><?php if(have_rows('info_rpt')): while(have_rows('info_rpt')) : the_row(); ?><div class="info"><?php if( have_rows('flex_cnt_text') ): while ( have_rows('flex_cnt_text') ) :  the_row(); ?>
<?php if( get_row_layout() == 'title' ): ?><h2 class="e-bold js-text"><?php the_sub_field('title_text'); ?></h2><?php elseif( get_row_layout() == 'link' ): ?><a href="<?php the_sub_field('url_link'); ?>"><button class="e-curp t-black js-text"><?php the_sub_field('link_text'); ?></button></a><?php elseif( get_row_layout() == 'paragraph' ): ?><p class="js-text"><?php the_sub_field('p_text'); ?></p><?php endif; endwhile; else : endif; ?></div><?php endwhile; else : endif; ?></div><div class="role__brand e-flex" style="background-color:<?php the_sub_field('background_color_brand'); ?>"><div class="role__brand__img"><img class="e-hp e-wp e-img-fit img-load" src="<?php echo get_sub_field('brand')['url']; ?>" alt="<?php echo get_sub_field('brand')['alt']; ?>"></div></div><div class="role__motto" style="background-color:<?php the_sub_field('background_color_motto'); ?>"><h2 class="e-bold js-text"><?php the_sub_field('motto'); ?></h2></div></section><?php elseif( get_row_layout() == 'brief' ): ?><section class="brief e-rel e-wvw"><div class="brief__hold e-hold callout"><p class="mini-heading"><?php the_sub_field('pre_heading'); ?></p><h3 class="lg-heading"><?php the_sub_field('brief_heading'); ?></h3><div class="copy"><?php the_sub_field('brief_copy'); ?></div></div></section><?php elseif( get_row_layout() == 'colors' ): ?><section class="colors e-rel e-wvw anima-text"><div class="colors__hold e-hold e-rel"><div class="inline e-wp"><div class="colors__texts"><h4 class="js-text e-serif"><?php the_sub_field('title_colors'); ?></h4><p class="js-text"><?php the_sub_field('text_colors'); ?></p></div><div class="colors__interact"><div class="colors__interact__arrows no-desk"><button class="svg-color"><svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 492 492"><path d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z"/></svg></button><button class="svg-color"><svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 492 492"><path d="M484.1 226.9L306.5 49.2c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.9l-16.1 16.1c-5.1 5.1-7.9 11.8-7.9 19 0 7.2 2.8 14.2 7.9 19.3L355.9 207.5H26.6C11.7 207.5 0 219.2 0 234v22.8c0 14.9 11.7 27.6 26.6 27.6h330.5L252.2 388.9c-5.1 5.1-7.9 11.7-7.9 18.9 0 7.2 2.8 13.9 7.9 18.9l16.1 16.1c5.1 5.1 11.8 7.8 19 7.8 7.2 0 14-2.8 19-7.9l177.7-177.7c5.1-5.1 7.9-11.9 7.9-19.1C492 238.8 489.2 232 484.1 226.9z"/></svg></button></div><div class="colors__ctn-colors e-rel e-hidden"><div class="colors__travel"><?php if(have_rows('colors_rpt')): while(have_rows('colors_rpt')) : the_row(); ?><div class="each-color <?php if (get_sub_field('is_white')) : ?>white<?php else : ?> <?php endif;  ?> e-hp" style="background-color:<?php the_sub_field('color_picker'); ?>"><div class="texts" style="color:<?php if( get_sub_field('black_or_white') == 'White') : ?>white<?php else : ?> black <?php endif;  ?>"><div class="color-name e-bold"><?php the_sub_field('color_name'); ?></div><div class="bottom-color"><div class="e-upper"><?php the_sub_field('color_picker'); ?></div><div><?php the_sub_field('color_rgb'); ?></div></div></div></div><?php endwhile; else : endif; ?></div></div></div></div></div></section><?php elseif( get_row_layout() == 'mockup' ): ?><section class="mockup e-rel e-wvw e-hidden"><img class="e-wp img-load" src="<?php echo get_sub_field('mockup_img')['url']; ?>" alt="<?php echo get_sub_field('mockup_img')['alt']; ?>"></section><?php elseif( get_row_layout() == 'parallax' ): ?><section class="parallax e-hidden"><div class="parallax__bg" style="background-color: #1A2938; background-image: url(<?php echo get_sub_field('parallax_img')['url']; ?>)"></div></section><div class="colored-section" style="background-color:<?php the_field('presentation_bg_color'); ?>; color:<?php the_field('presentation_text_color'); ?>;"><?php elseif( get_row_layout() == 'website' ): ?><section class="website e-rel e-wvw"><div class="website__hold e-hold callout"><p class="mini-heading"><?php the_sub_field('pre_heading'); ?></p><h3 class="lg-heading" style="color:<?php the_field('presentation_heading_color'); ?>"><?php the_sub_field('website_heading'); ?></h3><div class="copy"><?php the_sub_field('website_copy'); ?></div></div></section></div><?php elseif( get_row_layout() == 'presentation' ): ?><section class="home-page e-rel e-wvw anima-text" style="background-color:<?php the_field('presentation_bg_color'); ?>; color:<?php the_field('presentation_text_color'); ?>;"><div class="home-page__hold e-hold"><div class="inline e-rel e-wp"><div class="home-page__text e-fixed"><h4 class="e-serif js-text" style="color:<?php the_field('presentation_heading_color'); ?>"><?php the_sub_field('title_presentation'); ?></h4><p class="js-text"><?php the_sub_field('p_presentation'); ?></p></div><div class="home-page__image e-rel"><?php if(have_rows('img_presen_rpt')): while(have_rows('img_presen_rpt')) : the_row(); ?><img class="e-wp img-load" src="<?php echo get_sub_field('img_presentation')['url']; ?>" alt="<?php echo get_sub_field('img_presentation')['alt']; ?>"><?php endwhile; else : endif; ?></div></div></div></section><div class="js-release-text-home-page"></div><?php elseif( get_row_layout() == 'draggable' ): ?><section class="inner-pages e-rel e-wvw anima-text" style="background-color:<?php the_field('presentation_bg_color'); ?>; color:<?php the_field('presentation_text_color'); ?>;"><div class="inner-pages__hold e-hold callout"><p class="mini-heading"><?php the_sub_field('pre_heading'); ?></p><h3 class="lg-heading" style="color:<?php the_field('presentation_heading_color'); ?>"><?php the_sub_field('drag_heading'); ?></h3></div><div class="inner-pages__imgs ctn"><div class="inner-pages__imgs__travel holder"><?php if(have_rows('img_drag_rpt')): while(have_rows('img_drag_rpt')) : the_row(); ?><div class="each-inner-page e-hidden box"><img class="e-wp img-load" src="<?php echo get_sub_field('img_drag')['url']; ?>" alt="<?php echo get_sub_field('img_drag')['alt']; ?>"></div><?php endwhile; else : endif; ?></div></div><div class="inner-pages__cntrl no-mobile"><div class="numbers e-flex" style="color:<?php the_field('presentation_heading_color'); ?>"><div class="dyna e-bold actv js-text">01</div><div class="divider" style="background-color:<?php the_field('presentation_heading_color'); ?>"></div><div class="static e-bold js-text"><span class="e-sans">/</span>05</div></div><div class="indicator e-rel"><div class="indic-static e-wp e-black e-hp e-abs"></div><div class="indic-dyna e-wp e-black e-hp e-abs"></div></div></div></section><?php elseif( get_row_layout() == 'conclusion' ): ?><section class="conclusion e-rel e-wvw anima-3col"><div class="conclusion__hold e-hold"><h3 class="lg-heading"><?php the_sub_field('heading'); ?></h3><?php the_sub_field('copy')?><dl><dt><?php the_sub_field('big_number')?></dt><dd><?php the_sub_field('number_description')?></dd></dl></div></section><?php elseif (get_row_layout() == 'visit_the_site'): ?><section class="visit-the-site e-rel e-wvw"><a class="scale hover" href="<?php the_sub_field( 'link' ); ?>" target="_blank" rel="nofollow"><svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M65.4 39C65.4 38.2268 64.7732 37.6 64 37.6H51.4C50.6268 37.6 50 38.2268 50 39C50 39.7732 50.6268 40.4 51.4 40.4H62.6V51.6C62.6 52.3732 63.2268 53 64 53C64.7732 53 65.4 52.3732 65.4 51.6V39ZM36.9899 67.9899L64.9899 39.9899L63.01 38.0101L35.0101 66.01L36.9899 67.9899Z" fill="black"/><circle cx="50" cy="50" r="49" stroke="#707070" stroke-width="2"/></svg><span class="t-black e-sans">Visit the site</span><div class="line-link e-wp e-switch-gray e-switch"></div></a></section><?php elseif( get_row_layout() == 'quote' ): ?><section class="quote e-wvw e-rel anima-text" style="background-color:<?php the_sub_field('color_quote'); ?>"><div class="quote__hold e-hold"><div class="quote__svg"> <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 95.3 95.3"><style>.svg-quote{fill:#FFF;}</style><path d="M30.5 43.9c-2.3-0.7-4.7-1-7-1 -3.5 0-6.5 0.8-8.8 1.8 2.2-8.1 7.5-22 18-23.5 1-0.1 1.8-0.8 2-1.8l2.3-8.2c0.2-0.7 0.1-1.4-0.3-2s-1-1-1.7-1.1c-0.8-0.1-1.6-0.2-2.4-0.2 -12.6 0-25.2 13.2-30.4 32.1 -3.1 11.1-4 27.7 3.6 38.2 4.3 5.9 10.5 9 18.5 9.3 0 0 0.1 0 0.1 0 9.9 0 18.7-6.7 21.3-16.2 1.6-5.7 0.9-11.7-2-16.9C41 49.3 36.2 45.6 30.5 43.9z" data-original="#000000" class="active-path" data-old_color="#000000" class="svg-quote"/><path d="M92.5 54.4c-2.9-5.1-7.6-8.8-13.3-10.5 -2.3-0.7-4.7-1-7-1 -3.5 0-6.5 0.8-8.8 1.8 2.2-8.1 7.5-22 18-23.5 1-0.1 1.8-0.8 2-1.8l2.3-8.2c0.2-0.7 0.1-1.4-0.3-2 -0.4-0.6-1-1-1.7-1.1 -0.8-0.1-1.6-0.2-2.4-0.2 -12.6 0-25.2 13.2-30.4 32.1 -3.1 11.1-4 27.7 3.6 38.2 4.3 5.9 10.5 9 18.5 9.3 0 0 0.1 0 0.1 0 9.9 0 18.7-6.7 21.3-16.2C96.1 65.6 95.4 59.6 92.5 54.4z" data-original="#000000" class="active-path" data-old_color="#000000" class="svg-quote"/></svg></div><div class="quote__text"><?php if(have_rows('txt_quote_rpt')): while(have_rows('txt_quote_rpt')) : the_row(); ?><p class="t-white js-text"><?php the_sub_field('p_quote'); ?></p><?php endwhile; else : endif; ?></div></div></section><?php endif; endwhile; else : endif; ?><section class="next e-wvw e-hvh e-rel anima-text test"><div class="next__hold e-hold e-flex-col e-hp"><div class="next__subt e-serif js-text scale">NEXT PROJECT</div><div class="imgs-hidden e-hidden"><img class="js-img img-load" src="<?php echo get_field('next_project_image')['url']; ?>" alt="<?php echo get_field('next_project_image')['alt']; ?>"></div><div class="next__title"><?php $nextProject = get_field('next_project'); ?><a href="<?php echo get_site_url(); ?>/<?php echo $nextProject->post_name ?>" data-to="single" data-from="single" data-color="<?php the_field('color_project_next'); ?>"><button class="e-curp"><h1 class="t-black e-sans t-center js-text"><?php echo $nextProject->post_title ?></h1></button></a></div><div class="next__previous e-abs"><?php $prevProject = get_field('previous_project'); ?><a href="<?php echo get_site_url(); ?>/<?php echo $prevProject->post_name ?>" data-to="single" data-from="single" data-color="<?php the_field('color_project_prev'); ?>"><button class="e-curp e-rel scale hover-line"><span class="t-black e-sans js-text">PREV PROJECT<div class="line-link e-wp e-switch-gray e-switch"></div></span></button></a></div></div></section></main><?php include 'includes/myfooter.php'; ?></div></div></body></html>