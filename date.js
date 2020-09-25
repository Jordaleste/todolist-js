//This is our date module. It exports the functions getDate / getDay.
//Note, we do not add () to the export function. () are added when the function is used.
//Use module.exports to pass the functions to the file requiring this module.
//use module.exports = functionName if there is only 1 function in the file to export.
//use module.exports.functionName = functionName if multiple functions that can be exported
//use module... for each function we want access to
//We do NOT have to specify module.exports.function, can shorten to exports.function
//Common mistake is to type module.export, don't forget the s!

// module.exports.getDate = getDate; is the same as:
exports.getDate = getDate;

// console.log(module);

function getDate() {
    //prettier-ignore
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const today = new Date();
    const day = today.toLocaleDateString("en-US", options);
    return day;
}

//can also write the function this way, simply set the export.functionName to the anonymous function. Cleaner, easier to read than above.

exports.getDay = function () {
    //prettier-ignore
    const options = { weekday: 'long' };

    const today = new Date();
    return today.toLocaleDateString("en-US", options);
};
