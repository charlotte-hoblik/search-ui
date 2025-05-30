import React, { useState } from "react";
import { render } from "@testing-library/react";
import ResultContainer from "../Result";
import { ResultViewProps } from "@elastic/react-search-ui-views";
import { useSearch } from "../../hooks";

const mockSearchParams = {
  trackClickThrough: jest.fn()
};

jest.mock("../../hooks", () => ({
  useSearch: jest.fn()
}));

(useSearch as jest.Mock).mockReturnValue(mockSearchParams);

const params = {
  result: {
    id: {
      raw: "id",
      snippet: "<em>id</em>"
    },
    title: {
      raw: "title",
      snippet: "<em>title</em>"
    },
    url: {
      raw: "url",
      snippet: "<em>url</em>"
    }
  },
  titleField: "title",
  urlField: "url"
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("link clicks", () => {
  it("will call back when a document link is clicked in the view", () => {
    let viewProps;
    const View = (props) => {
      viewProps = props;
      return <div />;
    };

    render(<ResultContainer {...params} view={View} />);

    const { onClickLink } = viewProps;
    onClickLink();

    const [id] = mockSearchParams.trackClickThrough.mock.calls[0];
    expect(id).toEqual("id");
  });

  it("will not call back when shouldTrackClickThrough is false", () => {
    let viewProps;
    const View = (props) => {
      viewProps = props;
      return <div />;
    };

    render(
      <ResultContainer
        {...params}
        shouldTrackClickThrough={false}
        view={View}
      />
    );

    const { onClickLink } = viewProps;
    onClickLink();

    expect(mockSearchParams.trackClickThrough.mock.calls.length).toEqual(0);
  });

  it("will pass through tags", () => {
    let viewProps;
    const View = (props) => {
      viewProps = props;
      return <div />;
    };

    render(
      <ResultContainer
        {...params}
        clickThroughTags={["whatever"]}
        view={View}
      />
    );

    const { onClickLink } = viewProps;
    onClickLink();

    const [id, tags] = mockSearchParams.trackClickThrough.mock.calls[0];
    expect(id).toEqual("id");
    expect(tags).toEqual(["whatever"]);
  });
});

it("passes className through to the view", () => {
  let viewProps;
  const View = (props) => {
    viewProps = props;
    return <div />;
  };
  const className = "test-class";
  render(<ResultContainer {...params} className={className} view={View} />);
  expect(viewProps.className).toEqual(className);
});

it("passes data-foo through to the view", () => {
  let viewProps;
  const View = (props) => {
    viewProps = props;
    return <div />;
  };
  const data = "bar";
  render(<ResultContainer {...params} data-foo={data} view={View} />);
  expect(viewProps["data-foo"]).toEqual(data);
});

it("supports a render prop", () => {
  const renderProp = ({ children }: ResultViewProps) => {
    return <div>{children}</div>;
  };
  const { container } = render(
    <ResultContainer {...params} view={renderProp} />
  );
  expect(container).toMatchSnapshot();
});

describe("hooks support", () => {
  const MyResultView = () => {
    const [state] = useState(0);
    return <div>{state}</div>;
  };

  it("should allow hook to be used within a custom view component", () => {
    expect(() => {
      render(<ResultContainer {...params} view={MyResultView} />);
    }).not.toThrow();

    const { container } = render(
      <ResultContainer {...params} view={MyResultView} />
    );
    expect(container.textContent).toBe("0");
  });
});
