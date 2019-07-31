function round(date) {
    var duration = moment.duration(30, "minutes");
    var method = "ceil";
    return moment(Math[method]((+date) / (+duration)) * (+duration)); 
}

$(function () {
    $('#fixed-from').datetimepicker({
        format: 'HH:mm',
        stepping: 30,
        defaultDate: moment(round(moment()), 'HH:mm').add(0.5, 'h')
    });

    $('#flexible-from').datetimepicker({
        format: 'HH:mm',
        stepping: 30,
        defaultDate: moment(round(moment()), 'HH:mm')
    });

    $('#flexible-from').on("change.datetimepicker", function (e) {
        if($('#flexible-to').datetimepicker('date').isSameOrBefore(e.date))
            $('#flexible-to').datetimepicker('date', e.date.add(0.5, 'hour').format('HH:mm'));
    });

    $('#flexible-to').datetimepicker({
        format: 'HH:mm',
        stepping: 30,
        defaultDate: moment(round(moment()), 'HH:mm').add(0.5, 'h')
    });
});