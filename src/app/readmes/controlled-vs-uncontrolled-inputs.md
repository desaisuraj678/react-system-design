- Controlled Components
      A controlled component is a form element whose value is controlled by React state.


export default function ControlledInput() {
  const [name, setName] = useState('');

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
    </View>
  );
}

Advantages

✅ Full control over form data
✅ Easy validation (real-time)
✅ Predictable behavior

Drawbacks:
  Can be slower for complex forms due to frequent re-rendering.


- uncontrolled inputs
   Better performance for complex forms due to reduced re-rendering.

Drawbacks:
    Harder to implement validation and custom behavior.

function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = () => {
    const inputValue = inputRef.current.value;
    // Use inputValue for further processing
  };

  return (
    <View>
      <TextInput
        style={{ borderWidth: 1, padding: 10 }}
        ref={inputRef}
      />
      <Button title="Submit" onPress = {handleSubmit} />
    </View>
  );
}