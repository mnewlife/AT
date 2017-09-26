"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (findProducts, findProductById, createProduct, updateProductById, removeProductById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getProducts", getProducts);
    router.get("/getProduct/:productId", getProduct);
    router.post("/addProduct", addProduct);
    router.post("/updateProduct/:productId", updateProduct);
    router.get("/deleteProduct/:productId", deleteProduct);
    /*********************************************************/
    function getProducts(req, res, next) {
        var innerContext = "get-products";
        return findProducts(null, null, null)
            .then(function (foundProducts) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundProducts: foundProducts,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function getProduct(req, res, next) {
        var innerContext = "get-product";
        if (!req.params.productId) {
            return sendResponse(res, "grocRound-admin", false, "Product ID is missing", {
                innerContext: innerContext
            });
        }
        console.log("---" + req.params.productId);
        return findProductById(req.params.productId)
            .then(function (foundProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundProduct: foundProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            console.log(reason);
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find product", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addProduct(req, res, next) {
        var innerContext = "add-product";
        if (!req.body.label) {
            return sendResponse(res, "grocRound-admin", false, "Product label is missing", {
                innerContext: innerContext
            });
        }
        var details = {
            label: req.body.label,
            priceValues: {
                min: { price: 0 },
                max: { price: 0 },
                median: { price: 0 },
                mean: { price: 0 }
            },
            effectivePrice: { price: 0 }
        };
        if (req.body.effectivePrice) {
            details.effectivePrice.price = req.body.effectivePrice.price;
            if (req.body.effectivePrice.shopId) {
                details.effectivePrice.shopId = req.body.effectivePrice.shopId;
            }
        }
        if (req.body.images) {
            details.images = [];
            req.body.images.forEach(function (image) {
                details.images.push(image);
            });
        }
        return createProduct(details)
            .then(function (createdProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedProduct: createdProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function updateProduct(req, res, next) {
        var innerContext = "update-product";
        if (!req.params.productId) {
            return sendResponse(res, "grocRound-admin", false, "Product ID is missing", {
                innerContext: innerContext
            });
        }
        var details = {};
        if (req.body.label) {
            details.label = req.body.label;
        }
        if (req.body.imagesToAdd) {
            details.imagesToAdd = req.body.imagesToAdd;
        }
        if (req.body.imagesToRemove) {
            details.imagesToRemove = req.body.imagesToRemove;
        }
        if (req.body.priceValues) {
            details.priceValues = {};
            if (req.body.priceValues.min) {
                details.priceValues.min = {
                    price: req.body.priceValues.min.price
                };
                if (req.body.priceValues.min.shopId) {
                    details.priceValues.min.shopId = req.body.priceValues.min.shopId;
                }
            }
            if (req.body.priceValues.max) {
                details.priceValues.max = {
                    price: req.body.priceValues.max.price
                };
                if (req.body.priceValues.max.shopId) {
                    details.priceValues.max.shopId = req.body.priceValues.max.shopId;
                }
            }
            if (req.body.priceValues.median) {
                details.priceValues.median = {
                    price: req.body.priceValues.median.price
                };
                if (req.body.priceValues.median.shopId) {
                    details.priceValues.median.shopId = req.body.priceValues.median.shopId;
                }
            }
            if (req.body.priceValues.mean) {
                details.priceValues.mean = {
                    price: req.body.priceValues.mean.price
                };
                if (req.body.priceValues.mean.shopId) {
                    details.priceValues.mean.shopId = req.body.priceValues.mean.shopId;
                }
            }
        }
        if (req.body.effectivePrice) {
            details.effectivePrice = {
                price: req.body.effectivePrice.price
            };
            if (req.body.effectivePrice.shopId) {
                details.effectivePrice.shopId = req.body.effectivePrice.shopId;
            }
        }
        return updateProductById(req.params.productId, details)
            .then(function (updatedProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedProduct: updatedProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find product", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteProduct(req, res, next) {
        var innerContext = "delete-product";
        if (!req.params.productId) {
            return sendResponse(res, "grocRound-admin", false, "Product ID is missing", {
                innerContext: innerContext
            });
        }
        return removeProductById(req.params.productId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find product", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
