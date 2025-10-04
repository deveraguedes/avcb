const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = 8090;

app.use(cors());
app.use(express.json());

// Página principal com interface web
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>AVCB Database Viewer</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            .section { margin: 30px 0; }
            h2 { color: #333; border-bottom: 2px solid #007acc; }
            .btn { padding: 10px 15px; margin: 5px; background: #007acc; color: white; border: none; cursor: pointer; }
            .btn:hover { background: #005a9e; }
        </style>
    </head>
    <body>
        <h1>🗄️ AVCB Database Viewer</h1>
        
        <div class="section">
            <button class="btn" onclick="loadTable('users')">👥 Users</button>
            <button class="btn" onclick="loadTable('projetos')">📋 Projetos</button>
            <button class="btn" onclick="loadTable('tabela1')">📊 Tabela1 (Classificações)</button>
            <button class="btn" onclick="loadTable('perfilLocal')">🏢 Perfis Locais</button>
            <button class="btn" onclick="loadTable('tasks')">✅ Tasks</button>
        </div>
        
        <div id="content"></div>
        
        <script>
            async function loadTable(tableName) {
                try {
                    const response = await fetch('/api/table/' + tableName);
                    const data = await response.json();
                    
                    let html = '<h2>' + tableName.toUpperCase() + ' (' + data.length + ' registros)</h2>';
                    
                    if (data.length > 0) {
                        html += '<table>';
                        html += '<tr>';
                        Object.keys(data[0]).forEach(key => {
                            html += '<th>' + key + '</th>';
                        });
                        html += '</tr>';
                        
                        data.forEach(row => {
                            html += '<tr>';
                            Object.values(row).forEach(value => {
                                html += '<td>' + (value || 'NULL') + '</td>';
                            });
                            html += '</tr>';
                        });
                        html += '</table>';
                    } else {
                        html += '<p>Nenhum registro encontrado.</p>';
                    }
                    
                    document.getElementById('content').innerHTML = html;
                } catch (error) {
                    document.getElementById('content').innerHTML = '<p style="color: red;">Erro: ' + error.message + '</p>';
                }
            }
            
            // Carregar classificações por padrão
            loadTable('tabela1');
        </script>
    </body>
    </html>
  `);
});

// API endpoints para cada tabela
app.get('/api/table/users', async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/table/projetos', async (req, res) => {
  try {
    const data = await prisma.projeto.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/table/tabela1', async (req, res) => {
  try {
    const data = await prisma.tabela1.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/table/perfilLocal', async (req, res) => {
  try {
    const data = await prisma.perfilLocal.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/table/tasks', async (req, res) => {
  try {
    const data = await prisma.task.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Database Viewer rodando em http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});