const Header = ({course}) => {
return <h1>{course}</h1>
}

const Content = ({parts}) => {
return parts.map((part) => <Part key={part.id} part={part} />)
}

const Part = ({part}) => {
return (
    <p>
    {part.name}: {part.exercises}
    </p>
)
}

const Total = ({parts}) => {
return (
    <p>
    {parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)}
    </p>
)
}

const Course = ({course}) => (
<div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
</div>
)

export default Course