// ==UserScript==
// @name         [SY] Pasaport Randevu Başvuru
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Pasaport randevusu ayarlayıcı.
// @author       Serhat Yücel serhatyucell@hotmail.com
// @match        https://*.turkiye.gov.tr/nvi-pasaport-basvuru-randevusu*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==

(function() {

    //Config
    const EXCLUDE_TODAY = true;

    //Do not change.
    const url = window.location.href;
    const orig = window.location.origin;
    const today = new Date();
    const today_date = today.getDay().toString().padStart(2,"0")  + "/" +  (today.getMonth() +  1).toString().padStart(2,"0") + "/" + today.getFullYear().toString();

    $(document).ready(function(){
            if(url.includes('?yer=secimi')) {
               $("#il").val("34").change();

                setInterval(function() {
                    if($("#ilce option").length > 1) {
                        let size = $("#ilce option").length;
                        let counter = 0;
                        $("#ilce > option").each(function() {

                            if((!EXCLUDE_TODAY || (EXCLUDE_TODAY  && !$(this).text().includes(today_date)) ) && $(this).text() != "Seçiniz") {
                                $("#ilce").val($(this).val());
                                $('input[class="submitButton"]').click();
                                return;
                            }

                            counter++;
                            console.log(size +" - "+ counter);

                            if(size == counter) {
                                location.reload();
                            }
                        });

                    }else{
                        location.reload();
                    }
                },500);
                
            }else if(url.includes('?kisi=secimi')) {
                $('input:checkbox:first').prop( "checked", true );
                $('input[class="submitButton"]').click();
            }else if(url.includes('?randevu=olusturma')) {
                $('input[value="0"]').prop( "checked", true );
                $("#tarih").val($("#tarih option:eq(1)").val()).change();

                setInterval(function() {
                    $("#saat").val($("#saat option:eq(1)").val()).change();

                    if($("#saat option").length > 1) {
                       $('input[class="submitButton"]').click();
                    }

                    if($("#olusturBtn").length > 0){
                       $("#olusturBtn").click();
                    }
                },500);

            }
        });

})();
