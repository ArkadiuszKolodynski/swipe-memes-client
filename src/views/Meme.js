import React from "react";
import { Alert, Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/en-gb";

class Meme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meme: null
    };

    console.log(props);
  }

  componentDidMount() {
    this.getMeme(this.props.match.params.id);
  }

  render() {
    moment.locale("en-gb");
    if (this.state.meme === null) return "";
    return (
      <div>
        <Card className="my-5" bg="dark" border="info" text="light">
          <Card.Header>
            <strong>{this.state.meme.title}</strong>
          </Card.Header>
          <Card.Body className="p-0">
            <img
              className="w-100"
              src={`http://localhost:3000${this.state.meme.imageSrc}`}
              alt={this.state.meme.title}
            />
          </Card.Body>
          <Card.Footer>
            <span>
              <Link
                to={`/user/${this.state.meme.author._id}`}
                className="text-white"
              >
                <u>{this.state.meme.author.login}</u>
              </Link>
            </span>
            <span className="float-right">
              {`${moment(this.state.meme.createdAt).format("L LT")}`}
            </span>
          </Card.Footer>
        </Card>
        {this.state.meme.tags.length && (
          <Alert className="mb-5 lead" variant="primary">
            {this.state.meme.tags.map((tag, index) => (
              <Badge key={index} className="mx-1" variant="secondary">
                <a
                  href={`http://localhost:3001/tag/${tag.slug}`}
                  className="text-white"
                >
                  {tag.tag}
                </a>
              </Badge>
            ))}
          </Alert>
        )}
      </div>
    );
  }

  async getMeme(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/meme/${id}`);
      if (response.ok) {
        const meme = await response.json();
        this.setState({ meme });
        console.log(meme);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Meme;
