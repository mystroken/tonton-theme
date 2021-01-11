<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="theme-color" content="#000000"><title><?php    if(is_front_page())
       echo "Home";
   else if(is_404())
       echo "Page Not Found";
   else if(is_category() || is_search() )
       echo single_cat_title();
   else
       the_title();
   echo ' | '.get_bloginfo('name');
?></title><?php  //Template Name: Home
?><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/fonts/fonts.css"><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/app.css"><?php wp_head(); ?></head><body><?php include 'includes/mylottie.php'; ?>
<?php include 'includes/mymenu.php'; ?>
<?php include 'includes/myoverlay.php'; ?>
<?php include 'includes/mycanvas.php'; ?>
<?php include 'includes/myarchived.php'; ?>
<?php include 'includes/mygooey.php'; ?><div class="e-rel" id="barba-wrapper" data-barba="wrapper" data-scroll><div class="barba-container page-home e-wp" data-barba="container" data-barba-namespace="home" data-namespace="home" data-current="" data-scroll-content><div class="imgs-hidden e-hidden"><?php if(have_rows('folio_rpt','option')): while(have_rows('folio_rpt','option')) : the_row(); ?><img class="js-img img-load" src="<?php echo get_sub_field('image_project')['url']; ?>" alt="<?php echo get_sub_field('image_project')['alt']; ?>"><?php endwhile; else : endif; ?></div><div class="e-hold"><header class="header-home e-wp"><button class="header-home__welcome no-mobile e-rel e-curp hover-line scale"><div class="t-switch-gray e-rel wrap"><div class="wrapped">✋ Bienvenue</div><div class="line e-wp e-switch-gray e-switch"></div></div></button><div class="header-home__gif e-abs no-mobile"><img class="e-wp" src="<?php echo get_template_directory_uri(); ?>/images/seinfield.gif"></div><div class="header-home__title"><div class="hold-home"><h1 class="title-home t-switch pushoff wrap"><div class="wrapped">Welcome to</div></h1><h1 class="title-home t-switch wrap"><div class="wrapped">Tonton's</div></h1><h1 class="title-home t-switch wrap"><div class="wrapped">Portfolio</div></h1></div></div><div class="header-home__infos"><div class="header-home__infos__name"> <h2 class="t-switch-gray wrap"><div class="wrapped">Jaslin Tonton</div></h2></div><div class="header-home__infos__role"><h2 class="t-switch-gray wrap"><div class="wrapped">Independent Art Director</div></h2><h2 class="t-switch-gray wrap"><div class="wrapped">& UI/UX Designer</div></h2></div><div class="header-home__infos__available"><h2 class="t-switch-gray wrap"><div class="wrapped">Available for Freelance Work</div></h2><a href="mailto:hello#hellotonton.com"> <button class="e-curp hover-line scale"><div class="t-switch-gray wrap"><div class="wrapped">hello[at]hellotonton.com</div><div class="line e-wp e-switch-gray e-switch"></div></div></button></a></div></div></header><main class="main-home e-wp"><section class="options no-mobile e-wp"><div class="options__menu"><a class="options__menu__each" href="<?php echo get_site_url(); ?>/about" data-to="about"><button class="btn-scroll-to e-curp hover-line scale" data-scroll-to="about"><div class="e-sans t-switch-gray t-switch wrap"><div class="wrapped">About</div><div class="line-link e-wp e-switch"></div></div></button></a><a class="options__menu__each" href="<?php echo get_site_url(); ?>/works" data-to="works"><button class="btn-scroll-to e-curp hover-line scale" data-scroll-to="works"><div class="e-sans t-switch-gray t-switch wrap"><div class="wrapped">Work</div><div class="line-link e-wp e-switch"></div></div></button></a><a class="options__menu__each" href="<?php echo get_site_url(); ?>/footer" data-to="footer"><button class="btn-scroll-to e-curp hover-line scale" data-scroll-to="footer"><div class="e-sans t-switch-gray t-switch wrap"><div class="wrapped">Contact</div><div class="line-link e-wp e-switch"></div></div></button></a></div><div class="options__scroll"><div class="t-switch-gray t-switch e-bold wrap"><div class="wrapped">SCROLL</div></div></div><div class="options__switch-mode e-flex"><button class="e-curp scale"><div class="t-switch wrap switch-dark"><div class="wrapped">DARK</div></div></button><div class="separator e-switch-gray e-switch"></div><button class="e-curp switch-light scale"><div class="t-light t-switch-gray t-switch wrap t-switch wrap"><div class="wrapped">LIGHT</div></div></button></div></section><section class="about"><div class="hold-home scroll-about"><h1 class="title-home t-switch pushoff wrap start-about"><div class="wrapped">A Little</div></h1><h1 class="title-home t-switch wrap"><div class="wrapped">About</div></h1><h1 class="title-home t-switch wrap"><div class="wrapped">Me</div></h1><div class="hold-p"><p class="t-switch">Tonton. Name's so nice,</br> you say it twice.</p><p class="t-switch">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p class="t-switch"> exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div></div></section><section class="works"><div class="hold-home scroll-works"><h1 class="title-home t-switch wrap start-works"><div class="wrapped">Featured</div></h1><h1 class="title-home t-switch text-padding"><div class="wrapped">Work</div></h1><div class="links-folio" id="folio-ctn"><?php if(have_rows('folio_rpt','option')): while(have_rows('folio_rpt','option')) : the_row(); ?><div class="links-folio__each"><a href="<?php echo get_site_url(); ?>/<?php the_sub_field('url_project'); ?>" data-to="single" data-from="home" data-color="<?php the_sub_field('color_project'); ?>"><button class="e-curp hover-line"><h1 class="e-sans t-switch wrap"><div class="wrapped title-folio"><?php the_sub_field('title_project'); ?></div><div class="line-link e-wp e-switch"></div></h1></button></a></div><?php endwhile; else : endif; ?><div class="view-all hover-line"><button class="e-curp"><div class="e-sans t-switch-gray wrap"><div class="wrapped">VIEW WORK LIST</div></div></button><div class="line e-switch-gray e-switch"></div></div></div></div><div class="gap-black"></div></section></main></div><section class="awards e-wp"><div class="award__hold e-hold"><div class="hold-home"><div class="inline"><div class="awards__title start-awards"><h1 class="e-bold t-switch wrap"><div class="wrapped">Awards </div></h1><h1 class="e-bold t-switch wrap"><div class="wrapped">& Recognition</div></h1></div><div class="awards__fields"><div class="each-field"><div class="site"><div class="e-bold wrap"><div class="wrapped">Behance</div></div></div><div class="recog"><div class="t-switch-gray wrap"><div class="wrapped">Pantone</div></div><div class="t-switch-gray wrap"><div class="wrapped">Student Show</div></div></div></div><div class="each-field"><div class="site"><div class="e-bold t-switch-gray wrap"><div class="wrapped">Awwwards</div></div></div><div class="recog"><div class="t-switch-gray wrap"><div class="wrapped">SOTD</div></div></div></div></div></div></div></div></section><?php include 'includes/myfooter.php'; ?></div><!-- init foooter--></div></body></html>