(function () {
    /**
    *    Format the date & remove the seconds.
    *    @param Date Obj.
    *    @return date string
    */
    function formatTime(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }

    /**
    *    Get the time zone based on the local time.
    *    @param null
    *    @return string timezone.
    */
    function currentTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    /**
    *    Find the date based on the timezone.
    *    @param string timezone
    *    @return string date.
    */
    function getDateFromTimezone(websiteTimezone) {
        const currentDate = new Date();
        const options = {
            timeZone: websiteTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(currentDate);
    }

    /**
    *    Update the website time.
    *    @param null
    *    @return void.
    */
    function updateWebsiteTime(websiteTimezone) {
        const formattedWebsiteTime = getDateFromTimezone(websiteTimezone);
        document.getElementById('website-time').innerHTML = `: ${formattedWebsiteTime} (${websiteTimezone})`;
    }

    /**
    *    Display the local time div
    *    @param null
    *    @return void.
    */
    function displayLocalTimeDiv() {
        const element = document.getElementById('local-time-container');
        element.style.display = 'block'; 
    }

    /**
    *    Update the local time.
    *    @param string localtimezone
    *    @return void.
    */
    function updateLocalTime(localTimeZone) {
        const localTime = new Date();
        const formattedLocalTime = formatTime(localTime);
        document.getElementById('local-time').innerHTML = `: ${formattedLocalTime} (${localTimeZone})`;
    }

    /**
    *    Update the website & local time.
    *    @param null
    *    @return void
    */
    var exports = require("piwik/CoreHome");
    exports.updateTime = function (websiteTimezone) {
        if(websiteTimezone) {
            //Update the website time div.
            updateWebsiteTime(websiteTimezone);
            //Get Local timezone.
            const localTimeZone = currentTimeZone();
            //Check if the local time zone & the website timezone are same. If same, no need to show the local time.
            if(websiteTimezone !== localTimeZone) {
                //Diplay the local container.
                displayLocalTimeDiv();

                //Update local time.
                updateLocalTime(localTimeZone);
            }
            //Refresh the time for every minute.
            setTimeout(function () {exports.updateTime(websiteTimezone);}, 60000);
        }
    };
})();