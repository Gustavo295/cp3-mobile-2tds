import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  background: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  contentCadastro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: "blue",
    borderWidth: 1,
    height: 50,
    width: 220,
    borderRadius: 15,
    marginTop: 5
  },
  btn: {
    backgroundColor: "blue",
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 15,
    marginTop: 10
  },
  listarFlat: {
    backgroundColor: '#fff',
    width: 220,
    borderWidth: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
    borderRadius: 15,
    marginTop: 5
  },
  btnExcluir: {
    backgroundColor: "red",
    width: 80,
    borderRadius: 15,
    alignItems: "center",
    height: 21,
    marginTop: 7,
    marginBottom: 7,
  },
  btnEditar: {
    backgroundColor: "orange",
    width: 80,
    borderRadius: 15,
    alignItems: "center",
    height: 21,
    marginTop: 7,
    marginBottom: 7,
  },
  link: {
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    width: 250,
    height: 40,
    borderRadius: 10
  }
})
