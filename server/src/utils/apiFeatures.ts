import { DocumentType } from '@typegoose/typegoose';
import { Query } from 'mongoose';
import logger from './logger';

class ApiFeatures<QType> {
    public query: Query<
        DocumentType<QType>[],
        DocumentType<QType>,
        {},
        DocumentType<QType>
    >;

    public queryString: any;

    constructor(
        query: Query<
            DocumentType<QType>[],
            DocumentType<QType>,
            {},
            DocumentType<QType>
        >,
        queryString: any
    ) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObject = { ...this.queryString };
        const exludedFields = ['page', 'sort', 'limit', 'fields'];
        exludedFields.forEach((field) => delete queryObject[field]);

        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            logger.info(this.queryString.sort);
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

export default ApiFeatures;
