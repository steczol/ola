#! /bin/bash
# Little script for copying modified ola files

SOURCE_DIR='/home/steczol/openwrt/Sumo_Ola_Eclipse/'
#DEST_DIR='/home/steczol/openwrt/OpenWRT/openwrt/build_dir/target-mipsel_24kec+dsp_musl-1.1.11/ola-0.9.7/'
DEST_DIR='/home/steczol/openwrt/Sumo_Ola_Steczol/'
#DEST_DIR='/home/steczol/openwrt/ola-test'
rsync -a -r -v -h $SOURCE_DIR $DEST_DIR

#This part changes the modification time of Makefile at /openwrt/feeds/packages/net/ola for applying changes during the compilation of ola for the target
ola_make_src='/home/steczol/openwrt/Makefile_feeds_packages_net_ola'
ola_make_dst='/home/steczol/openwrt/OpenWRT/openwrt/feeds/packages/net/ola/Makefile'
#rsync -a -v -W $ola_make_scr $ola_make_dst
#touch $ola_make_dst

