import styled from "@emotion/styled";

export const PaperStyled = styled.div`
  padding: 16px;
  max-width: 400px;
  margin: auto;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

export const TitleStyled = styled.h5`
  text-align: center;
  margin-bottom: 16px;
`;

export const TaskItemStyled = styled.li<{ completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  span {
    text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  }
`;
