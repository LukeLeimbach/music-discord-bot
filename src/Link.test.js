import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer'
import Link from './Link';

test('renders learn react link', () => {
  render(<Link page="https://example.com">Link</Link>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it('changes the class when hovered', ()=>{
    const component = renderer.create(
        <Link page="https://example.com">Link</Link>
    )
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    renderer.act(()=>{
        tree.props.onMouseEnter();
    })

    tree = component.toJSON();

    expect(tree).toMatchSnapshot();
    
})