from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from ..models import Product, Category, User, CustomerOrder, OrderItem

api_bp = Blueprint("api",__name__, url_prefix = "/api")
api = Api(api_bp)


class ProductList(Resource):
    def get(self):
        products = Product.query.all()
        data = []
        for p in products:
            data.append({
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "price": p.price,
                "category":p.category.name if p.category else None


            })
        return jsonify(data)
api.add_resource(ProductList, "/products")