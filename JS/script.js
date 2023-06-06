// Функция для мгновенного отображения превью изображения
function previewImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var imageContainer = $(input).parent();
            var image = imageContainer.find('img');

            image.attr('src', e.target.result);
            imageContainer.find('span').hide();
            imageContainer.css('background-color', 'transparent');
            imageContainer.css('border', 'none');
            imageContainer.css('cursor', 'auto');
            imageContainer.off('click');
            imageContainer.find('input[type="file"]').remove();
        }

        reader.readAsDataURL(input.files[0]);
    }
}

// Функция для изменения яркости, контрастности, насыщенности и оттенка в реальном времени
function adjustImage() {
    var brightness = parseFloat($('#brightness').val());
    var contrast = parseFloat($('#contrast').val());
    var saturation = parseFloat($('#saturation').val());
    var hue = parseFloat($('#hue').val());

    // Проверяем, если значения range slider'ов отличаются от значений по умолчанию
    if (brightness !== 1 || contrast !== 1 || saturation !== 1 || hue !== 0) {
        // Выбираем эффект "Custom"
        $('#effect').val('custom');
    }

    $('.image-container img').css('filter', 'brightness(' + brightness + ') contrast(' + contrast + ') saturate(' + saturation + ') hue-rotate(' + hue + 'deg)');
}

// Обработчик клика на блок загрузки изображения
$(document).ready(function () {
    $('.image-container').on('click', function () {
        $(this).find('input[type="file"]').trigger('click');
    });

    $('#image').on('change', function () {
        previewImage(this);
    });
});

function applyEffect() {
    var effect = $('#effect').val();

    switch (effect) {
        case 'none':
            $('.image-container img').css('filter', 'none');
            // Сброс значений range sliderов
            $('#brightness').val(1);
            $('#contrast').val(1);
            $('#saturation').val(1);
            $('#hue').val(0);
            break;
        case 'blur':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg) blur(5px)');
            break;
        case 'black-white':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(0) hue-rotate(0deg)');
            break;
        case 'sepia':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg) sepia(1)');
            break;
        case 'negative':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg) invert(1)');
            break;
        case 'vintage':
            $('.image-container img').css('filter', 'brightness(1) contrast(0.8) saturate(0.8) hue-rotate(0deg) sepia(0.5)');
            break;
        case 'toning':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg) hue-rotate(30deg)');
            break;
        case 'pop-art':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg) sepia(0.5) contrast(200%)');
            break;
        case 'saturation':
            $('.image-container img').css('filter', 'brightness(1) contrast(1) saturate(2) hue-rotate(0deg)');
            break;
    }
}

// Функция для скачивания измененного изображения
// Функция для скачивания измененного изображения
function downloadImage() {
    // Получаем URL измененного изображения
    var canvas = document.createElement('canvas');
    var image = document.querySelector('.image-container img');
    canvas.width = image.naturalWidth; // использовать naturalWidth для получения исходной ширины
    canvas.height = image.naturalHeight; // использовать naturalHeight для получения исходной высоты
    var context = canvas.getContext('2d');
    context.filter = image.style.filter;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Преобразуем изображение в Data URL
    var imageUrl = canvas.toDataURL('image/jpeg');

    // Создаем ссылку для скачивания
    var link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'edited_image.jpg';

    // Добавляем ссылку на страницу и автоматически кликаем по ней для скачивания
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


