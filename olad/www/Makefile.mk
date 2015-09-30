wwwdir = $(www_datadir)
assetsdir = $(www_datadir)/assets
newdir = $(www_datadir)/new
viewsdir = $(www_datadir)/new/views
jsdir = $(www_datadir)/new/js
cssdir = $(www_datadir)/new/css
imgdir = $(www_datadir)/new/img
jquerydir = $(www_datadir)/new/libs/jquery/js
angularroutedir = $(www_datadir)/new/libs/angular-route/js
angulardir = $(www_datadir)/new/libs/angular/js
bootcssdir = $(www_datadir)/new/libs/bootstrap/css
bootjsdir = $(www_datadir)/new/libs/bootstrap/js
bootfontsdir = $(www_datadir)/new/libs/bootstrap/fonts

dist_www_DATA = \
	olad/www/ola.html	\
	olad/www/style.css	\
	olad/www/boilerplate.css	\
	olad/www/setquantity.js	\
	olad/www/respond.min.js	\
	olad/www/spacelight.js	\
	olad/www/ola.js
dist_assets_DATA = \
	olad/www/assets/advanced.png \
    olad/www/assets/arrowleft.png \
    olad/www/assets/arrowright.png \
    olad/www/assets/darrowleft.png \
    olad/www/assets/darrowright.png \
    olad/www/assets/info.png \
    olad/www/assets/k.png \
    olad/www/assets/logo.png \
    olad/www/assets/on-off.png \
    olad/www/assets/percentage.png	
dist_new_DATA = \
    olad/www/new/index.html
dist_views_DATA = \
    olad/www/new/views/overview.html \
    olad/www/new/views/plugin-info.html \
    olad/www/new/views/plugins.html \
    olad/www/new/views/universe-add.html \
    olad/www/new/views/universe-faders.html \
    olad/www/new/views/universe-header.html \
    olad/www/new/views/universe-keypad.html \
    olad/www/new/views/universe-overview.html \
    olad/www/new/views/universe-patch.html \
    olad/www/new/views/universe-rdm.html \
    olad/www/new/views/universe-settings.html \
    olad/www/new/views/universes.html
dist_js_DATA = \
    olad/www/new/js/app.min.js \
    olad/www/new/js/app.min.js.map
dist_css_DATA = \
    olad/www/new/css/style.min.css 
dist_img_DATA = \
    olad/www/new/img/light_bulb_off.png \
    olad/www/new/img/light_bulb.png \
    olad/www/new/img/logo-mini.png \
    olad/www/new/img/logo.png
dist_jquery_DATA = \
    olad/www/new/libs/jquery/js/jquery.min.js
dist_angularroute_DATA = \
    olad/www/new/libs/angular-route/js/angular-route.min.js
dist_angular_DATA = \
    olad/www/new/libs/angular/js/angular.min.js
dist_bootjs_DATA = \
    olad/www/new/libs/bootstrap/js/bootstrap.min.js
dist_bootfonts_DATA = \
    olad/www/new/libs/bootstrap/fonts/glyphicons-halflings-regular.eot \
    olad/www/new/libs/bootstrap/fonts/glyphicons-halflings-regular.svg \
    olad/www/new/libs/bootstrap/fonts/glyphicons-halflings-regular.ttf \
    olad/www/new/libs/bootstrap/fonts/glyphicons-halflings-regular.woff \
    olad/www/new/libs/bootstrap/fonts/glyphicons-halflings-regular.woff2
dist_bootcss_DATA = \
    olad/www/new/libs/bootstrap/css/bootstrap.min.css
