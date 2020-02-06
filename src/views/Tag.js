import React from "react";
import { Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.match.params.page
        ? parseInt(props.match.params.page)
        : 1,
      memes: [],
      pages: [],
      tag: props.match.params.tag
    };
  }
  componentDidMount() {
    this.getMemes(this.state.currentPage, this.state.tag);
  }
  render() {
    return (
      <div>
        {this.state.memes &&
          this.state.memes.map(meme => (
            <Link to={`/meme/${meme._id}`} key={meme._id}>
              <Card className="my-5" bg="dark" border="info" text="light">
                <Card.Body className="p-3">
                  <Card.Text>
                    <strong>{meme.title}</strong>
                  </Card.Text>
                </Card.Body>
                <Card.Img
                  variant="bottom"
                  src={`http://localhost:3000${meme.imageSrc}`}
                  alt={meme.title}
                />
              </Card>
            </Link>
          ))}
        <Pagination className="my-5 justify-content-center">
          {this.state.pages}
        </Pagination>
      </div>
    );
  }

  async getMemes(page, tag) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/meme/page/${page}?status=APPROVED&tag=${tag}`
      );
      if (response.ok) {
        const data = await response.json();
        const pages = [];
        pages.push(
          <Pagination.Prev
            key="prev"
            href={`/memes/${data.prevPage}`}
            disabled={!data.hasPrevPage}
          />
        );

        for (let i = 1; i <= data.totalPages; i++) {
          pages.push(
            <Pagination.Item active={page === i} key={i} href={`/memes/${i}`}>
              {i}
            </Pagination.Item>
          );
        }

        pages.push(
          <Pagination.Next
            key="next"
            href={`/memes/${data.nextPage}`}
            disabled={!data.hasNextPage}
          />
        );
        this.setState({
          memes: data.docs,
          pages
        });
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Tag;
