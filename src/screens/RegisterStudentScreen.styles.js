import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  message: {
    color: "#fff",
    marginBottom: 10
  }
});
