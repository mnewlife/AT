"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
function setupHookStructure(components, tasks) {
    return {
        auth: {
            Connected_To_Database: {
                tags: ["success"],
                afterware: [
                    function (happening) {
                    }
                ]
            }
        }
    };
}
exports.default = setupHookStructure;
/******************************************************************************/
