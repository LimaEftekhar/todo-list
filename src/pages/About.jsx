import styled from 'styled-components';

const StyledDiv = styled.div`
    text-align: center;
    line-height: 1.5rem;
`
function About({title}) {
  return (
    <StyledDiv>
      <h2>{title}</h2>
      <p>This is a Todo list app built with React.</p>
      <p>Created by: <br/> Lima Eftekhar</p>
    </StyledDiv>
  );
}

export default About;