"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
exports.absentWrong = function (parent, child, type) {
    if (type == "array") {
        return ((!parent[child] || !Array.isArray(parent[child])));
    }
    if (type == "object") {
        return ((!parent[child] || typeof parent[child] !== "object"));
    }
    if (type == "boolean") {
        return ((!parent[child] || typeof parent[child] !== "boolean"));
    }
    if (type == "number") {
        return ((!parent[child] || typeof parent[child] !== "number"));
    }
    if (type == "string") {
        return ((!parent[child] || typeof parent[child] !== "string"));
    }
};
/******************************************************************************/
exports.optionalWrong = function (parent, child, type) {
    if (type == "array") {
        return ((parent[child] && Array.isArray(parent[child])));
    }
    if (type == "object") {
        return ((parent[child] && typeof parent[child] == "object"));
    }
    if (type == "boolean") {
        return ((parent[child] && typeof parent[child] == "boolean"));
    }
    if (type == "number") {
        return ((parent[child] && typeof parent[child] == "number"));
    }
    if (type == "string") {
        return ((parent[child] && typeof parent[child] == "string"));
    }
};
/******************************************************************************/ 
