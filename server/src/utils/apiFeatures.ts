import { Query } from 'mongoose';

interface QueryString {
  page?: string;
  limit?: string;
  sort?: string;
}

class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: QueryString;

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate(): this {
    const page = parseInt(this.queryString.page!) || 1;
    const limit = parseInt(this.queryString.limit!) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }
}

export default APIFeatures;
