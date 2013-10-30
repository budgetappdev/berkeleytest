

//#aboutBT_page, #about_page, #strips_page, #foodslist_page, #profile_page, #mylog_scrollable, #edit_scrollable, #summary_scrollable, #food_list, #foodedit_list, #about_page


function onDeviceReady()
{
  
    
    $('body').bind('touchmove',function(e){
                   if(!$('#aboutBT_page').has($(e.target)).length && !$('#about_page').has($(e.target)).length && !$('#strips_page').has($(e.target)).length && !$('#foodslist_page').has($(e.target)).length && !$('#profile_page').has($(e.target)).length && !$('#mylog_scrollable').has($(e.target)).length && !$('#edit_scrollable').has($(e.target)).length && !$('#summary_scrollable').has($(e.target)).length && !$('#food_list').has($(e.target)).length && !$('#foodedit_list').has($(e.target)).length){e.preventDefault()};
             
                 });
    
    scrollIntro = new iScroll('introWrapper',{
                              useTransform: true,
                              useTransition:true,
                              checkDOMChanges: true,
                              snap: true,
                              momentum: false,
                              hScrollbar: false,
                              vScrollbar: false,
                              onScrollEnd: function () {
                              var currentpage = this.currPageX*1+1
                              console.log("page="+ currentpage);
                              if(currentpage==6){
                              $(".nextButton").cssFadeOut('250');
                              }else{
                              if($(".nextButton").css('opacity')==0)$(".nextButton").cssFadeIn('250');
                              }
                              $('#introIndicator > li.active').removeClass('active');
                              $('#introIndicator > li:nth-child(' + (this.currPageX+1) + ')').addClass('active');
                              }
                              
                              });
    
    
    
    
    scrollNav = new iScroll('navWrapper',{
                            useTransform: true,
                            useTransition:true,
                            checkDOMChanges: true,
                            snap: true,
                            momentum: false,
                            hScrollbar: false,
                            vScrollbar: false,
                            onScrollEnd: function () {
                            var currentpage = this.currPageX*1+1;
                            console.log("page="+ currentpage);
                            if(currentpage==1){
                            $(".nextButton").show().cssFadeOut('250');
                            }else{
                            $(".nextButton").show().cssFadeIn('250');
                            }
                            
                            $(".p1middle .strip span").each(function(){
                                                            $(this).css("box-shadow","0px 7px 7px rgba(0,0,0,.5)");
                                                            });
                            
                            $(".p1middle .strip span:nth-child("+currentpage+")").css("box-shadow","0px 1px 5px rgba(0,0,0,.5)");
                            }
                            
                            });
    
    
    scrollNav2 = new iScroll('navWrapper2',{
                             useTransform: true,
                             useTransition:true,
                             checkDOMChanges: true,
                             snap: true,
                             momentum: false,
                             hScrollbar: false,
                             vScrollbar: false,
                             onScrollEnd: function () {
                             var currentpage = this.currPageX*1+1;
                             console.log("page="+ currentpage);
                             if(currentpage==1){
                             $(".nextButton").show().cssFadeOut('250');
                             }else{
                             $(".nextButton").show().cssFadeIn('250');
                             }
                             
                             $(".p2middle .strip span").each(function(){
                                                             $(this).css("box-shadow","0px 7px 7px rgba(0,0,0,.5)");
                                                             });
                             
                             $(".p2middle .strip span:nth-child("+currentpage+")").css("box-shadow","0px 1px 5px rgba(0,0,0,.5)");
                             }
                             
                             });
    
    
    
    
    
    
    //client_browser = ChildBrowser.install();
    
    $("input:not(:disabled)").focus(function(){
                                    appML.appManagerShowLoading();
                                    $(".darkOverlay").addClass("darkOverlay_off");
                                    setTimeout(function(){appML.appManagerHideLoading()},500);
                                    });
    
    
    $("input").blur(function(){
                    appML.appManagerHideLoading();
                    });
    
    
    $("#panel0:visible").livequery(function(){
                                   $("#appML_top").hide();
                                   $("#appML_bottom").hide();
                                   });
    $("#panel1:visible").livequery(function(){
                                   $("#appML_top").show();
                                   $("#appML_bottom").show();
                                   $(".bottommenu tr td:nth-child(1) div img").attr("src","img/icon_myday_selected.png");
                                   $(".bottommenu tr td:nth-child(2) div img").attr("src","img/icon_log.png");
                                   $(".roundtab img").attr("src","img/icon_strips.png");
                                   $(".bottommenu tr td:nth-child(4) div img").attr("src","img/icon_stats.png");
                                   $(".bottommenu tr td:nth-child(5) div img").attr("src","img/icon_more.png");
                                   });
    $("#panel2:visible").livequery(function(){
                                   $("#appML_top").show();
                                   $("#appML_bottom").show();
                                   $(".bottommenu tr td:nth-child(1) div img").attr("src","img/icon_myday.png");
                                   $(".bottommenu tr td:nth-child(2) div img").attr("src","img/icon_log_selected.png");
                                   $(".roundtab img").attr("src","img/icon_strips.png");
                                   $(".bottommenu tr td:nth-child(4) div img").attr("src","img/icon_stats.png");
                                   $(".bottommenu tr td:nth-child(5) div img").attr("src","img/icon_more.png");
                                   });
    $("#panel3:visible").livequery(function(){
                                   $("#appML_top").show();
                                   $("#appML_bottom").show();
                                   $(".bottommenu tr td:nth-child(1) div img").attr("src","img/icon_myday.png");
                                   $(".bottommenu tr td:nth-child(2) div img").attr("src","img/icon_log.png");
                                   $(".roundtab img").attr("src","img/icon_strips_selected.png");
                                   $(".bottommenu tr td:nth-child(4) div img").attr("src","img/icon_stats.png");
                                   $(".bottommenu tr td:nth-child(5) div img").attr("src","img/icon_more.png");
                                   });
    $("#panel4:visible").livequery(function(){
                                   $("#appML_top").show();
                                   $("#appML_bottom").show();
                                   $(".bottommenu tr td:nth-child(1) div img").attr("src","img/icon_myday.png");
                                   $(".bottommenu tr td:nth-child(2) div img").attr("src","img/icon_log.png");
                                   $(".roundtab img").attr("src","img/icon_strips.png");
                                   $(".bottommenu tr td:nth-child(4) div img").attr("src","img/icon_stats_selected.png");
                                   $(".bottommenu tr td:nth-child(5) div img").attr("src","img/icon_more.png");
                                   });
    $("#panel5:visible").livequery(function(){
                                   $("#appML_top").show();
                                   $("#appML_bottom").show();
                                   $(".bottommenu tr td:nth-child(1) div img").attr("src","img/icon_myday.png");
                                   $(".bottommenu tr td:nth-child(2) div img").attr("src","img/icon_log.png");
                                   $(".roundtab img").attr("src","img/icon_strips.png");
                                   $(".bottommenu tr td:nth-child(4) div img").attr("src","img/icon_stats.png");
                                   $(".bottommenu tr td:nth-child(5) div img").attr("src","img/icon_more_selected.png");
                                   });
    
    
    
    
    
    $("#home_page:visible").livequery(function(){
                                      $("#appML_top").hide();
                                      
                                      $("#appML_navigation_bar").hide();
                                      
                                      
                                      });
    
    $("#home_page:hidden").livequery(function(){
                                     $("#appML_navigation_bar").show();
                                     
                                     });
    
    
    
    
    
    
    
    
    $("#about_page:visible").livequery(function(){
                                       $("#appML_navigation_bar").hide();
                                       
                                       
                                       $(".nextButton").hide();
                                       
                                       $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                          console.log("tap");
                                                                                          if(!allowClick) return false;
                                                                                          jQT.goBack();
                                                                                          preventGhostClick();
                                                                                          });
                                       });
    
    
    $("#intro_page:visible").livequery(function(){
                                       
                                       $("#appML_top").show();
                                       $("#appML_navigation_bar").show();
                                       
                                       
                                       $(".nextButton").show().html("Sign in").unbind().bind("touchstart",function(){
                                                                                             if(!allowClick) return false;
                                                                                             
                                                                                             scrollIntro.scrollToPage(6,0,500);
                                                                                             
                                                                                             preventGhostClick();
                                                                                             });
                                       
                                       $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                          if(!allowClick) return false;
                                                                                          jQT.goBack();
                                                                                          preventGhostClick();
                                                                                          });
                                       
                                       
                                       setTimeout(function(){scrollIntro.scrollToPage(0,0,1000)},500);
                                       });
    
    
    
    $("#login_page:visible").livequery(function(){
                                       $("#appML_navigation_bar").show();
                                       
                                       
                                       $(".nextButton").hide().html("right").unbind().bind("touchstart",function(){
                                                                                           if(!allowClick) return false;
                                                                                           //do something
                                                                                           preventGhostClick();
                                                                                           });
                                       
                                       $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                          if(!allowClick) return false;
                                                                                          jQT.goBack();
                                                                                          preventGhostClick();
                                                                                          });
                                       });
    /*
     
     $("#menu_page:visible").livequery(function(){
     
     $("#appML_navigation_bar").show();
     
     
     $("#navbartitle").html("Berkeley Test");
     $(".nextButton").hide();
     $(".backButton").hide();
     
     });
     */
    
    
    
    $("#profile_page:visible").livequery(function(){
                                         $("#navbartitle").html("My profile");
                                         $(".nextButton").show().html("Save").unbind().bind("touchstart",function(){
                                                                                            if(!allowClick) return false;
                                                                                            update_account();
                                                                                            preventGhostClick();
                                                                                            });
                                         $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                            if(!allowClick) return false;
                                                                                            jQT.goBack();
                                                                                            preventGhostClick();
                                                                                            });
                                         });
    
    $("#alerts_page:visible").livequery(function(){
                                        
                                        
                                        $("#navbartitle").html("My alerts");
                                        $(".nextButton").hide();
                                        $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                           if(!allowClick) return false;
                                                                                           jQT.goBack();
                                                                                           preventGhostClick();
                                                                                           });
                                        });
    
    
    
    $("#foodslist_page:visible").livequery(function(){
                                           $("#navbartitle").html("NO-rich foods");
                                           $(".nextButton").hide();
                                           $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                              if(!allowClick) return false;
                                                                                              jQT.goBack();
                                                                                              preventGhostClick();
                                                                                              });
                                           });
    
    
    $("#strips_page:visible").livequery(function(){
                                        $("#navbartitle").html("How to use strips");
                                        $(".nextButton").hide();
                                        $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                           if(!allowClick) return false;
                                                                                           jQT.goBack();
                                                                                           preventGhostClick();
                                                                                           });
                                        });
    
    $("#shop_page:visible").livequery(function(){
                                      $("#navbartitle").html("Online store");
                                      $(".nextButton").hide();
                                      $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                         if(!allowClick) return false;
                                                                                         jQT.goBack();
                                                                                         preventGhostClick();
                                                                                         });
                                      });
    
    $("#aboutBT_page:visible").livequery(function(){
                                         $("#navbartitle").html("About Berkeley Test<span class='superscript'>®</span>");
                                         $(".nextButton").hide();
                                         $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                            if(!allowClick) return false;
                                                                                            jQT.goBack();
                                                                                            preventGhostClick();
                                                                                            });
                                         });
    
    /*
     $("#aboutBB_page:visible").livequery(function(){
     $("#navbartitle").html("About BerkBar<span class='superscript'>®</span>");
     $(".nextButton").hide();
     $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
     if(!allowClick) return false;
     jQT.goBack();
     preventGhostClick();
     });
     });
     
     */
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $("#myday_page:visible").livequery(function(){
                                       
                                       activepanel = "myday";
                                       /*
                                        $("#navbartitle").show().html(targetday.toString('MMMM d, yyyy')).unbind().bind("touchstart",function(){
                                        jQT.goTo("#myday_calendar","slideup");
                                        calendarBuilder(0);
                                        });
                                        
                                        
                                        $(".nextButton").show().html("▶▶").unbind().bind("touchstart",function(){
                                        if(!allowClick) return false;
                                        plot_measurements(1);
                                        preventGhostClick();
                                        });
                                        $(".backButton").show().html("◀◀").unbind().bind("touchstart",function(){
                                        if(!allowClick) return false;
                                        plot_measurements(-1);
                                        preventGhostClick();
                                        });
                                        
                                        */
                                       $("#navbartitle").html("My DAY");
                                       
                                       
                                       $(".nextButton").hide();
                                       $(".backButton").hide();
                                       
                                       
                                       $("#myday_picker span:nth-child(2)").html(targetday.toString('dddd, MMMM d')).unbind().bind("touchstart",function(){
                                                                                                                                   jQT.goTo("#myday_calendar","slideup");
                                                                                                                                   calendarBuilder(0);
                                                                                                                                   });
                                       
                                       $("#myday_picker span:nth-child(3)").show().unbind().bind("touchstart",function(){
                                                                                                 if(!allowClick) return false;
                                                                                                 plot_measurements(1);
                                                                                                 preventGhostClick();
                                                                                                 });
                                       $("#myday_picker span:nth-child(1)").show().unbind().bind("touchstart",function(){
                                                                                                 if(!allowClick) return false;
                                                                                                 plot_measurements(-1);
                                                                                                 preventGhostClick();
                                                                                                 });
                                       
                                       
                                       
                                       
                                       /*
                                        if(targetday.equals(Date.today())) {
                                        console.log("hide nextButton");
                                        $(".nextButton").hide();
                                        }else if(targetday.isAfter(Date.today())){
                                        $(".nextButton").hide();
                                        console.log("we do not travel to the future!");
                                        return;
                                        }else{
                                        console.log("show nextButton");
                                        $(".nextButton").show();
                                        }
                                        */
                                       
                                       $("#today_button").css("font-weight","bold").css("color","#ffffff");
                                       $("#week_button").css("font-weight","normal").css("color","#dedede");
                                       $("#month_button").css("font-weight","normal").css("color","#dedede");
                                       });
    
    
    
    $("#myday_calendar:visible").livequery(function(){
                                           
                                           $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                              if(!allowClick) return false;
                                                                                              jQT.goBack();
                                                                                              preventGhostClick();
                                                                                              });
                                           });
    
    
    
    
    
    
    
    
    
    $("#mylog_page:visible").livequery(function(){
                                       
                                       activepanel = "mylog";
                                       
                                       
                                       $("#navbartitle").html("My Measurements");
                                       
                                       
                                       $(".nextButton").hide();
                                       $(".backButton").hide();
                                       
                                       
                                       $("#mylog_picker span:nth-child(2)").unbind().bind("touchstart",function(){
                                                                                          jQT.goTo("#mylog_calendar","slideup");
                                                                                          calendarBuilder(0);
                                                                                          });
                                       
                                       $("#mylog_picker span:nth-child(3)").show().unbind().bind("touchstart",function(){
                                                                                                 if(!allowClick) return false;
                                                                                                 list_measurements(1);
                                                                                                 preventGhostClick();
                                                                                                 });
                                       $("#mylog_picker span:nth-child(1)").show().unbind().bind("touchstart",function(){
                                                                                                 if(!allowClick) return false;
                                                                                                 list_measurements(-1);
                                                                                                 preventGhostClick();
                                                                                                 });
                                       
                                       
                                       });
    
    
    
    
    
    
    $("#mylog_calendar:visible").livequery(function(){
                                           $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                              if(!allowClick) return false;
                                                                                              jQT.goBack();
                                                                                              preventGhostClick();
                                                                                              });
                                           });
    
    
    
    var colorindex=0;
    
    $("#mynoxy_page:visible").livequery(function(){
                                        $("#appML_navigation_bar").show();
                                        
                                        
                                        $('#DOM').val(new Date().toString("yyyy-MM-dd"));
                                        $('#TOM').val(new Date().toString().substring(16,21));
                                        
                                        
                                        //scrollNav.refresh();
                                        //scrollNav.scrollToPage(colorindex,0,0);
                                        
                                        
                                        setTimeout(function(){
                                                   
                                                   
                                                   $("#navbartitle").show().html("Nitric Oxide Level");
                                                   
                                                   $(".nextButton").hide().html("Next").unbind().bind("touchstart",function(){
                                                                                                      if(!allowClick) return false;
                                                                                                      if(($("#DOM").val()=="")||($("#TOM").val()=="")){
                                                                                                      navigator.notification.alert("Please enter the date and time of measurement", null, "Note")
                                                                                                      }else{
                                                                                                      jQT.goTo("#meal_page","slide");
                                                                                                      }
                                                                                                      preventGhostClick();
                                                                                                      });
                                                   
                                                   
                                                   $(".backButton").hide();
                                                   
                                                   
                                                   },250);
                                        
                                        
                                        
                                        });
    
    
    
    $(".p1middle .strip span").unbind().bind("touchstart",function(){
                                             
                                             $(".p1middle .strip span").each(function(){
                                                                             $(this).css("box-shadow","0px 7px 7px rgba(0,0,0,.5)");
                                                                             });
                                             
                                             $(this).css("box-shadow","0px 1px 5px rgba(0,0,0,.5)");
                                             console.log("touch");
                                             
                                             colorindex = $(this).index();
                                             console.log("colorindex="+colorindex);
                                             scrollNav.scrollToPage(colorindex,0,300);
                                             
                                             
                                             
                                             
                                             switch (colorindex){
                                             case 1:
                                             NO_value=1;
                                             NO_level="DEPLETED";
                                             break;
                                             
                                             case 2:
                                             NO_value=5;
                                             NO_level="LOW";
                                             break;
                                             
                                             case 3:
                                             NO_value=10;
                                             NO_level="AT THRESHOLD";
                                             break;
                                             
                                             case 4:
                                             NO_value=20;
                                             NO_level="ON TARGET";
                                             break;
                                             
                                             case 5:
                                             NO_value=40;
                                             NO_level="HIGH";
                                             break;
                                             }
                                             
                                             $("#summary table tr:nth-child(3) td:nth-child(2)").html(NO_level);
                                             });
    
    
    $("#meal_page:visible").livequery(function(){
                                      $("#navbartitle").html("Meal");
                                      
                                      $(".nextButton").hide();
                                      
                                      
                                      $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                         if(!allowClick) return false;
                                                                                         jQT.goBack();
                                                                                         preventGhostClick();
                                                                                         });
                                      
                                      });
    
    
    
    
    
    $("#meal_page2:visible").livequery(function(){
                                       $("#navbartitle").html("Meal");
                                       
                                       $(".nextButton").show().html("Next").unbind().bind("touchstart",function(){
                                                                                          if(!allowClick) return false;
                                                                                          
                                                                                          if($("#TSM").val()==""){
                                                                                          navigator.notification.alert("Please enter the time of meal", null, "Note")
                                                                                          }else{
                                                                                          jQT.goTo("#summary_page","slide");
                                                                                          }
                                                                                          preventGhostClick();
                                                                                          });
                                       
                                       
                                       $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                          if(!allowClick) return false;
                                                                                          jQT.goBack();
                                                                                          preventGhostClick();
                                                                                          });
                                       
                                       $('#TSM').val(new Date().toString().substring(16,21));
                                       
                                       console.log("LOF length="+LOF.length);
                                       });
    
    
    
    
    
    /*
     $("#exercise_page:visible").livequery(function(){
     $("#navbartitle").html("Exercise");
     
     $(".nextButton").hide();
     
     $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
     if(!allowClick) return false;
     jQT.goBack();
     preventGhostClick();
     });
     
     doe_val=1;
     
     });
     
     
     
     
     
     
     $("#exercise_page2:visible").livequery(function(){
     $("#navbartitle").html("Exercise");
     console.log("LOE length="+LOE.length);
     $(".nextButton").show().html("Next").unbind().bind("touchstart",function(){
     if(!allowClick) return false;
     jQT.goTo("#summary_page","slide");
     preventGhostClick();
     });
     
     
     $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
     if(!allowClick) return false;
     jQT.goBack();
     preventGhostClick();
     });
     
     
     $('#TSE').val(new Date().toString().substring(16,21));
     
     if($("#doe_str").text()==""){
     doeval = new sliderControl('#doe',0,244,{
     initialValue:60,
     valueSelector: '#doe_str',
     onslide: function(delta, change){
     this.thumb.innerHTML = this.value;
     tow = (Math.round(this.percent/100*4*60*.06666)/.06666);
     hrs = Math.floor(tow/60);
     min = Math.floor(tow%60);
     if(min<10){min="0"+min;}
     this.$value.innerHTML = hrs+"h "+min+"m";
     doe_val = tow;
     }
     });
     
     
     }
     
     
     
     });
     
     
     */
    
    
    
    
    $("#summary_page:visible").livequery(function(){
                                         $("#navbartitle").html("Summary");
                                         
                                         $(".nextButton").show().html("Save").unbind().bind("touchstart",function(){
                                                                                            if(!allowClick) return false;
                                                                                            //jQT.goBack("#mynoxy_page","slide");
                                                                                            jQT.goTo("#mylog_page");
                                                                                            record_measurement();
                                                                                            preventGhostClick();
                                                                                            });
                                         
                                         
                                         $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                            if(!allowClick) return false;
                                                                                            jQT.goBack();
                                                                                            preventGhostClick();
                                                                                            });
                                         summarise_measurement();
                                         
                                         
                                         });
    
    
    
    
    
    
    
    
    
    $("#edit_page:visible").livequery(function(){
                                      
                                      
                                      
                                      
                                      $("#navbartitle").html("My Measurements");
                                      
                                      if($(".editbuttons").css("display")=="block"){
                                      $(".nextButton").show().css("opacity","1").html("Save").unbind().bind("touchstart",function(){
                                                                                                            if(!allowClick) return false;
                                                                                                            update_measurement();
                                                                                                            preventGhostClick();
                                                                                                            });
                                      }else{
                                      $(".nextButton").show().css("opacity","1").html("Edit").unbind().bind("touchstart",function(){
                                                                                                            if(!allowClick) return false;
                                                                                                            $(".editbuttons").cssFadeIn("fast");
                                                                                                            $(".nextButton").html("Save");
                                                                                                            preventGhostClick();
                                                                                                            });
                                      }
                                      
                                      
                                      
                                      $(".backButton").show().html("Cancel").unbind().bind("touchstart",function(){
                                                                                           if(!allowClick) return false;
                                                                                           jQT.goBack();
                                                                                           preventGhostClick();
                                                                                           });
                                      
                                      
                                      });
    
    
    
    
    var colorindex2=0;
    
    $("#mynoxyedit_page:visible").livequery(function(){
                                            
                                            $("#appML_navigation_bar").show();
                                            
                                            
                                            $("#navbartitle").show().html("Nitric Oxide Level");
                                            
                                            switch (NO_value){
                                            case 1:
                                            colorindex2 = 1;
                                            bg_color=color_depleted;
                                            NO_level="DEPLETED";
                                            break;
                                            
                                            case 5:
                                            colorindex2 = 2;
                                            bg_color=color_low;
                                            NO_level="LOW";
                                            break;
                                            
                                            case 10:
                                            colorindex2 = 3;
                                            bg_color=color_threshold;
                                            NO_level="AT THRESHOLD";
                                            break;
                                            
                                            case 20:
                                            colorindex2 = 4;
                                            bg_color=color_ontarget;
                                            NO_level="ON TARGET";
                                            break;
                                            
                                            case 40:
                                            colorindex2 = 5;
                                            bg_color=color_high;
                                            NO_level="HIGH";
                                            break;
                                            }
                                            
                                            //scrollNav2.refresh();
                                            //scrollNav2.scrollToPage(colorindex2,0,0);
                                            
                                            $(".nextButton").show().html("Save").unbind().bind("touchstart",function(){
                                                                                               if(!allowClick) return false;
                                                                                               
                                                                                               if(($("#DOMedit").val()=="")||($("#TOMedit").val()=="")){
                                                                                               navigator.notification.alert("Please enter the date and time of measurement", null, "Note")
                                                                                               }else{
                                                                                               
                                                                                               bg_color="";
                                                                                               NO_level="";
                                                                                               switch (NO_value){
                                                                                               case 1:
                                                                                               bg_color=color_depleted;
                                                                                               NO_level="DEPLETED";
                                                                                               break;
                                                                                               
                                                                                               case 5:
                                                                                               bg_color=color_low;
                                                                                               NO_level="LOW";
                                                                                               break;
                                                                                               
                                                                                               case 10:
                                                                                               bg_color=color_threshold;
                                                                                               NO_level="AT THRESHOLD";
                                                                                               break;
                                                                                               
                                                                                               case 20:
                                                                                               bg_color=color_ontarget;
                                                                                               NO_level="ON TARGET";
                                                                                               break;
                                                                                               
                                                                                               case 40:
                                                                                               bg_color=color_high;
                                                                                               NO_level="HIGH";
                                                                                               break;
                                                                                               }
                                                                                               
                                                                                               $("#edit_content #edit_scrollable ul li:first-child span:nth-child(1)").css("background",bg_color);
                                                                                               $("#edit_content #edit_scrollable li:nth-child(1) span:nth-child(2)").html("<div style='color:#0d76dc;padding-bottom:5px'>Measured on "+Date.parse($("#DOMedit").val()).toString("MM/dd/yy")+" at "+toAMPM($("#TOMedit").val())+"</div>NO level: "+NO_level);
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               jQT.goBack();
                                                                                               preventGhostClick();
                                                                                               }
                                                                                               });
                                            
                                            $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                               if(!allowClick) return false;
                                                                                               jQT.goBack();
                                                                                               preventGhostClick();
                                                                                               });
                                            
                                            console.log("DOM:"+DOM);
                                            console.log("TOM:"+TOM);
                                            
                                            $('#DOMedit').val(DOM);
                                            $('#TOMedit').val(TOM);
                                            
                                            
                                            
                                            
                                            $(".p2middle .strip span").unbind().bind("touchstart",function(){
                                                                                     $(".p2middle .strip span").each(function(){
                                                                                                                     $(this).css("box-shadow","0px 7px 7px rgba(0,0,0,.5)");
                                                                                                                     
                                                                                                                     });
                                                                                     
                                                                                     $(this).css("box-shadow","0px 1px 5px rgba(0,0,0,.5)");
                                                                                     
                                                                                     colorindex2 = $(this).index();
                                                                                     scrollNav2.scrollToPage(colorindex2,0,300);
                                                                                     console.log("colorindex2="+colorindex2);
                                                                                     
                                                                                     switch (colorindex2){
                                                                                     case 1:
                                                                                     NO_value=1;
                                                                                     NO_level="DEPLETED";
                                                                                     break;
                                                                                     
                                                                                     case 2:
                                                                                     NO_value=5;
                                                                                     NO_level="LOW";
                                                                                     break;
                                                                                     
                                                                                     case 3:
                                                                                     NO_value=10;
                                                                                     NO_level="AT THRESHOLD";
                                                                                     break;
                                                                                     
                                                                                     case 4:
                                                                                     NO_value=20;
                                                                                     NO_level="ON TARGET";
                                                                                     break;
                                                                                     
                                                                                     case 5:
                                                                                     NO_value=40;
                                                                                     NO_level="HIGH";
                                                                                     break;
                                                                                     }
                                                                                     
                                                                                     });
                                            
                                            });
    
    
    
    
    $("#mealedit_page2:visible").livequery(function(){
                                           $("#navbartitle").html("Meal");
                                           
                                           
                                           $(".nextButton").show().html("Save").unbind().bind("touchstart",function(){
                                                                                              
                                                                                              if(!allowClick) return false;
                                                                                              
                                                                                              if($("#TSMedit").val()==""){
                                                                                              navigator.notification.alert("Please enter the time of meal", null, "Note")
                                                                                              }else{
                                                                                              
                                                                                              $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").html("");
                                                                                              
                                                                                              if(LOF.length>0){
                                                                                              $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#0d76dc'>Meal at "+toAMPM($("#TSMedit").val())+"</div></div>");
                                                                                              
                                                                                              for(f=0;f<LOF.length;f++){
                                                                                              $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#000; width:150px;display:inline-block'>"+LOF[f][0]+"</div><div align='right'style='color:#666; width:50px;display:inline-block'>"+LOF[f][1]+"</div></div>");
                                                                                              }
                                                                                              }else{
                                                                                              $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#999'><i>BEFORE MEAL</i></div></div>");
                                                                                              }
                                                                                              jQT.goBack();
                                                                                              preventGhostClick();
                                                                                              }
                                                                                              
                                                                                              });
                                           
                                           
                                           $(".backButton").show().html("Back").unbind().bind("touchstart",function(){
                                                                                              if(!allowClick) return false;
                                                                                              jQT.goBack();
                                                                                              preventGhostClick();
                                                                                              });
                                           
                                           
                                           
                                           
                                           console.log("TSM:"+TSM);
                                           $('#TSMedit').val(TSM);
                                           
                                           var listItems = [];
                                           var template = "<li class='arrow' style='font-family:AvenirNextCondensed-Regular' onclick='food_selector(\"mealedit_items\",\"ID\",\"FOOD\",\"QTY\")'><span style='display:inline-block; width:220px'>FOOD</span><span style='display:inline-block; width:50px'>QTY</span></li>"
                                           
                                           if(LOF.length>0){
                                           for(i=0;i<LOF.length;i++){
                                           listItems.push(template.replace(/ID/g,i).replace(/FOOD/g,LOF[i][0]).replace(/QTY/g,LOF[i][1]));
                                           }
                                           }else{
                                           listItems.push("<li><br></li><li><br></li><li><br></li>");
                                           }
                                           
                                           
                                           document.getElementById("mealedit_items").innerHTML = listItems.join("");
                                           //setTimeout(function(){appML.refreshIscroll("foodedit_list",$("#mealedit_items").height()+50)},500);
                                           });
    
    
    
    
    
    $("#stats_page:visible").livequery(function(){
                                       $("#appML_navigation_bar").show();
                                       
                                       
                                       
                                       $("#navbartitle").html("My Statistics");
                                       
                                       $(".nextButton").show().css('opacity',1).html("Help").unbind().bind("touchstart",function(){
                                                                                                           if(!allowClick) return false;
                                                                                                           $("#stats_overlay").cssFadeTo(500,0.6); $("#stats_help").cssFadeTo(500,1);
                                                                                                           preventGhostClick();
                                                                                                           });
                                       
                                       $('#stats_from').val(new Date().toString("yyyy-MM-dd"));
                                       $('#stats_to').val(new Date().toString("yyyy-MM-dd"));
                                       
                                       $(".backButton").hide();
                                       
                                       if($("#stats_graph").html()=="empty"){
                                       load_stats("2012-12-12","2111-11-11");
                                       }else{
                                       reload_stats();
                                       }
                                       
                                       });
    
    
    $("#friends_page:visible").livequery(function(){
                                         $("#appML_navigation_bar").show();
                                         
                                         
                                         $("#navbartitle").html("My Friends");
                                         $(".nextButton").hide();
                                         $(".backButton").hide();
                                         
                                         });
    
    
    $("#more_page:visible").livequery(function(){
                                      
                                      
                                      $("#appML_navigation_bar").show();
                                      
                                      
                                      $("#navbartitle").html("More");
                                      
                                      $(".nextButton").hide();
                                      $(".backButton").hide();
                                      
                                      
                                      });
    
    
    
    $("#today_button").bind("touchstart",function(){
                            $("#today_button").css("font-weight","bold").css("color","#ffffff");
                            $("#week_button").css("font-weight","normal").css("color","#dedede");
                            $("#month_button").css("font-weight","normal").css("color","#dedede");
                            
                            
                            $("#myday_picker span:nth-child(3)").show().unbind().bind("touchstart",function(){
                                                                                      if(!allowClick) return false;
                                                                                      plot_measurements(1);
                                                                                      preventGhostClick();
                                                                                      });
                            $("#myday_picker span:nth-child(1)").show().unbind().bind("touchstart",function(){
                                                                                      if(!allowClick) return false;
                                                                                      plot_measurements(-1);
                                                                                      preventGhostClick();
                                                                                      });
                            plot_measurements("-");
                            });
    
    
    $("#week_button").bind("touchstart",function(){
                           $("#today_button").css("font-weight","normal").css("color","#dedede");
                           $("#week_button").css("font-weight","bold").css("color","#ffffff");
                           $("#month_button").css("font-weight","normal").css("color","#dedede");
                           
                           $("#myday_picker span:nth-child(3)").show().unbind().bind("touchstart",function(){
                                                                                     if(!allowClick) return false;
                                                                                     plot_weekly_measurements(1);
                                                                                     preventGhostClick();
                                                                                     });
                           $("#myday_picker span:nth-child(1)").show().unbind().bind("touchstart",function(){
                                                                                     if(!allowClick) return false;
                                                                                     plot_weekly_measurements(-1);
                                                                                     preventGhostClick();
                                                                                     });
                           plot_weekly_measurements("-");
                           });
    
    
    $("#month_button").bind("touchstart",function(){
                            $("#today_button").css("font-weight","normal").css("color","#dedede");
                            $("#week_button").css("font-weight","normal").css("color","#dedede");
                            $("#month_button").css("font-weight","bold").css("color","#ffffff");
                            
                            $("#myday_picker span:nth-child(3)").show().unbind().bind("touchstart",function(){
                                                                                      if(!allowClick) return false;
                                                                                      plot_monthly_measurements(1);
                                                                                      preventGhostClick();
                                                                                      });
                            $("#myday_picker span:nth-child(1)").show().unbind().bind("touchstart",function(){
                                                                                      if(!allowClick) return false;
                                                                                      plot_monthly_measurements(-1);
                                                                                      preventGhostClick();
                                                                                      });
                            plot_monthly_measurements("-");
                            });
    
    
    $("#TOMrec").blur(function() {
                      TOM = Date.parse($("#TOMrec").val());
                      });
    
    
    $("#stats_period").blur(function(){
                            var selectedoption = $(this).find(":selected").text();
                            
                            if(selectedoption == "period"){
                            $("#stats_from").attr('disabled','');
                            $("#stats_to").attr('disabled','');
                            load_stats($("#stats_from").val(),$("#stats_to").val());
                            }else{
                            $("#stats_from").attr('disabled','disabled');
                            $("#stats_to").attr('disabled','disabled');
                            
                            if(selectedoption == "all time"){
                            load_stats("2012-12-12","2111-11-11");
                            }else if(selectedoption == "this week"){
                            load_stats(Date.monday().toString('yyyy-MM-dd'),Date.next().sunday().toString('yyyy-MM-dd'));
                            }else if(selectedoption == "this month"){
                            load_stats(Date.today().moveToFirstDayOfMonth().toString('yyyy-MM-dd'),Date.today().moveToLastDayOfMonth().toString('yyyy-MM-dd'));
                            }else if(selectedoption == "last week"){
                            load_stats(Date.monday().addWeeks(-1).toString('yyyy-MM-dd'),Date.next().sunday().addWeeks(-1).toString('yyyy-MM-dd'));
                            }else if(selectedoption == "last month"){
                            load_stats(Date.today().addMonths(-1).moveToFirstDayOfMonth().toString('yyyy-MM-dd'),Date.today().addMonths(-1).moveToLastDayOfMonth().toString('yyyy-MM-dd'));
                            }
                            
                            }
                            
                            console.log(from);
                            console.log(to);
                            });
    
    
    
    
    
    
    
    
    
    $("#stats_from,#stats_to").blur(function(){
                                    load_stats($("#stats_from").val(),$("#stats_to").val());
                                    });
    
    
    
    
    $(".toggle_button").bind("touchstart",function(){
                             
                             if($(this).attr("src")=="img/toggle_on.png"){
                             $(this).attr("src","img/toggle_off.png");
                             navigator.notification.alert("Reminders have been turned OFF.", deactivate_reminders(), "Notifications");
                             }else{
                             $(this).attr("src","img/toggle_on.png");
                             navigator.notification.alert("Reminders have been turned ON.", activate_reminders(), "Notifications");
                             }
                             });
    
    
    landing();
    
}
