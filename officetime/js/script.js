$(document).ready(function() {

    $('.tabs_item').click(function(){
        var index = $(this).attr('data-tabindex');
        $('.tabs_item').removeClass('active');
        $(this).addClass('active');

        $('.tabs_content').hide();
        $('.tabs_content_' + index).show();
    });

    $('.slaider_block .right_arrow').click(function() {

        var currentIndex = parseInt($('.slaider_block').find('.slide-item.active').attr('data-slide-index'));
        nextSlideIndex = currentIndex + 1;

        if($('.slaider_block .slide-item').length == nextSlideIndex) {
            $('.slaider_block .right_arrow').hide();
            $('#slide-item-' + currentIndex).removeClass('active').fadeOut(function() {

                $('#slide-item-' + nextSlideIndex).addClass('active').fadeIn();
            });
            return false;
        } else {
            $('.slaider_block .left_arrow').show();
            $('#slide-item-' + currentIndex).removeClass('active').fadeOut(function() {

                $('#slide-item-' + nextSlideIndex).addClass('active').fadeIn();
            });
        }
    });

    $('.slaider_block .left_arrow').click(function() {

        var currentIndex = parseInt($('.slaider_block').find('.slide-item.active').attr('data-slide-index'));
        prevSlideIndex = currentIndex - 1;

        if(prevSlideIndex == 1) {
            $('.slaider_block .left_arrow').hide();
            $('#slide-item-' + currentIndex).removeClass('active').fadeOut(function() {

                $('#slide-item-' + prevSlideIndex).addClass('active').fadeIn();
            });
            return false;
        } else {
            $('.slaider_block .right_arrow').show();
            $('#slide-item-' + currentIndex).removeClass('active').fadeOut(function() {

                $('#slide-item-' + prevSlideIndex).addClass('active').fadeIn();
            });
        }
    });
});