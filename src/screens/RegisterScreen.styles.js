import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1E1E1E",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 12,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#bbb",
  },
});